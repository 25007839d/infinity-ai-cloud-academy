import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { courses as legacyCourses } from './src/data/courses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === 'production';

if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not configured. Set it in Hostinger Environment Variables.');
}

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
  charset: 'utf8mb4',
};

// Main Academy/LMS database connection. Keep this isolated from the SQL Lab database.
const pool = mysql.createPool({
  ...dbConfig,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function hasDbColumn(tableName, columnName) {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?
  `, [tableName, columnName]);
  return Number(rows[0]?.count) > 0;
}

async function hasDbTable(tableName) {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
  `, [tableName]);
  return Number(rows[0]?.count) > 0;
}

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts. Please try again later.' },
});

const demoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

const sqlLabLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'SQL Lab rate limit reached. Please wait a few minutes.' },
});

function sendSuccess(res, data = null, status = 200) {
  return res.status(status).json({ success: true, data });
}

function sendError(res, message, status = 400) {
  return res.status(status).json({ success: false, message });
}

function createToken(payload) {
  if (!JWT_SECRET) throw new Error('Server authentication is not configured.');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function setAuthCookie(res, token) {
  res.cookie('iaa_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

function clearAuthCookie(res) {
  res.clearCookie('iaa_token', { httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/' });
}

function authConfigError(res) {
  if (JWT_SECRET) return false;
  return sendError(res, 'Authentication is not configured on the server. Please set JWT_SECRET in Hostinger Environment Variables and restart the Node.js app.', 503);
}

function requireAuth(requiredRole = null) {
  return async (req, res, next) => {
    try {
      if (!JWT_SECRET) return authConfigError(res);
      const token = req.cookies.iaa_token;
      if (!token) return sendError(res, 'Authentication required.', 401);

      const payload = jwt.verify(token, JWT_SECRET);
      req.auth = payload;

      if (requiredRole && payload.role !== requiredRole) {
        return sendError(res, 'Admin access required.', 403);
      }

      if (payload.role === 'admin') {
        const [rows] = await pool.query(
          'SELECT id, email, full_name, status, role FROM admins WHERE id = ? LIMIT 1',
          [payload.sub]
        );
        if (!rows.length || rows[0].status !== 'Active') {
          clearAuthCookie(res);
          return sendError(res, 'Your account is disabled or no longer exists.', 401);
        }
        req.admin = rows[0];
      } else if (payload.role === 'student') {
        const phoneColumn = await hasDbColumn('users', 'phone');
        const [rows] = await pool.query(
          `SELECT id, email, ${phoneColumn ? 'phone' : 'NULL AS phone'}, full_name, role, status FROM users WHERE id = ? LIMIT 1`,
          [payload.sub]
        );
        if (!rows.length || rows[0].status !== 'Active') {
          clearAuthCookie(res);
          return sendError(res, 'Your account is disabled or no longer exists.', 401);
        }
        req.user = rows[0];
      }

      next();
    } catch (error) {
      clearAuthCookie(res);
      return sendError(res, 'Session expired. Please login again.', 401);
    }
  };
}

app.get('/health', async (req, res) => {
  return res.status(200).json({ success: true, service: 'infinity-ai-cloud-academy', node: process.version });
});

app.get('/api/ping', (req, res) => {
  return sendSuccess(res, { service: 'infinity-ai-cloud-academy', node: process.version });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return sendSuccess(res, { status: 'ok', database: 'connected', authentication: JWT_SECRET ? 'configured' : 'missing' });
  } catch (error) {
    console.error('Health DB error:', error.message);
    return sendError(res, 'Database connection failed.', 503);
  }
});

// ---------- Public authentication ----------
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    if (authConfigError(res)) return;
    const { email, password, full_name, phone } = req.body;
    if (!email || !password || !full_name || !phone) return sendError(res, 'Full name, mobile number, email and password are required.');
    if (!/^\d{10}$/.test(String(phone).trim())) return sendError(res, 'Mobile number must be exactly 10 digits.');
    if (password.length < 8) return sendError(res, 'Password must be at least 8 characters.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPhone = String(phone).trim();
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [normalizedEmail]);
    if (existing.length) return sendError(res, 'An account with this email already exists.', 409);
    const [existingPhone] = await pool.query('SELECT id FROM users WHERE phone = ? LIMIT 1', [normalizedPhone]);
    if (existingPhone.length) return sendError(res, 'An account with this mobile number already exists.', 409);

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);

    await pool.query(
      `INSERT INTO users (id, email, phone, password_hash, full_name, role, status)
       VALUES (?, ?, ?, ?, ?, 'student', 'Active')`,
      [id, normalizedEmail, normalizedPhone, passwordHash, String(full_name).trim()]
    );

    const token = createToken({ sub: id, role: 'student' });
    setAuthCookie(res, token);
    return sendSuccess(res, { id, email: normalizedEmail, phone: normalizedPhone, full_name: String(full_name).trim(), role: 'student' }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return sendError(res, 'Unable to create account.', 500);
  }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    if (authConfigError(res)) return;
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Email and password are required.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const phoneColumn = await hasDbColumn('users', 'phone');
    const [rows] = await pool.query(
      `SELECT id, email, ${phoneColumn ? 'phone' : 'NULL AS phone'}, password_hash, full_name, role, status FROM users WHERE email = ? LIMIT 1`,
      [normalizedEmail]
    );

    if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return sendError(res, 'Invalid email or password.', 401);
    }
    if (rows[0].status !== 'Active') return sendError(res, 'Your account has been disabled.', 403);

    const user = rows[0];
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);
    const token = createToken({ sub: user.id, role: 'student' });
    setAuthCookie(res, token);

    return sendSuccess(res, { id: user.id, email: user.email, phone: user.phone, full_name: user.full_name, role: user.role });
  } catch (error) {
    console.error('User login error:', error);
    return sendError(res, 'Unable to login.', 500);
  }
});

app.post('/api/auth/logout', (req, res) => {
  clearAuthCookie(res);
  return sendSuccess(res, { logged_out: true });
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.cookies.iaa_token;
    if (!token) return sendError(res, 'Not authenticated.', 401);
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.role === 'admin') {
      const [rows] = await pool.query(
        'SELECT id, email, full_name, role, status FROM admins WHERE id = ? LIMIT 1',
        [payload.sub]
      );
      if (!rows.length || rows[0].status !== 'Active') return sendError(res, 'Not authenticated.', 401);
      return sendSuccess(res, rows[0]);
    }

    const phoneColumn = await hasDbColumn('users', 'phone');
    const [rows] = await pool.query(
      `SELECT id, email, ${phoneColumn ? 'phone' : 'NULL AS phone'}, full_name, role, status FROM users WHERE id = ? LIMIT 1`,
      [payload.sub]
    );
    if (!rows.length || rows[0].status !== 'Active') return sendError(res, 'Not authenticated.', 401);
    return sendSuccess(res, rows[0]);
  } catch {
    return sendError(res, 'Not authenticated.', 401);
  }
});

app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, 'Email is required.');

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const [rows] = await pool.query('SELECT id, email, full_name FROM users WHERE email = ? LIMIT 1', [normalizedEmail]);

    // Do not reveal whether an account exists.
    if (!rows.length) return sendSuccess(res, { message: 'If an account exists, a reset email will be sent.' });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    await pool.query(
      `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
       VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 30 MINUTE))`,
      [crypto.randomUUID(), rows[0].id, tokenHash]
    );

    const resetUrl = `${process.env.APP_URL || 'https://infinityaicloudacademy.com'}/reset-password?token=${rawToken}`;
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('SMTP not configured. Password reset URL:', resetUrl);
      return sendSuccess(res, { message: 'Password reset is generated, but email delivery is not configured yet.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: rows[0].email,
      subject: 'Infinity AI Cloud Academy password reset',
      text: `Reset your password using this link: ${resetUrl}`,
      html: `<p>Hello ${rows[0].full_name || 'there'},</p><p>Reset your password within 30 minutes:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    return sendSuccess(res, { message: 'If an account exists, a reset email will be sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return sendError(res, 'Unable to process password reset.', 500);
  }
});

app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return sendError(res, 'Reset token and new password are required.');
    if (password.length < 8) return sendError(res, 'Password must be at least 8 characters.');

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const [rows] = await pool.query(
      `SELECT id, user_id FROM password_reset_tokens
       WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW() LIMIT 1`,
      [tokenHash]
    );
    if (!rows.length) return sendError(res, 'Invalid or expired reset token.', 400);

    const passwordHash = await bcrypt.hash(password, 12);
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, rows[0].user_id]);
    await pool.query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?', [rows[0].id]);
    return sendSuccess(res, { message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return sendError(res, 'Unable to reset password.', 500);
  }
});


// ---------- Public course APIs (DB-first, legacy-safe fallback) ----------
function mapCourseRow(row, technologies = [], curriculum = [], seo = null) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    shortDescription: row.short_description,
    overview: row.overview,
    thumbnail: row.thumbnail,
    banner: row.banner,
    category: row.category,
    duration: row.duration,
    level: row.level,
    mode: row.mode,
    language: row.language,
    certificate: {
      available: Boolean(row.certificate_available),
      title: row.certificate_title,
    },
    featured: Boolean(row.featured),
    students: row.students,
    rating: row.rating === null ? null : Number(row.rating),
    projects: Number(row.projects || 0),
    modules: Number(row.modules_count || curriculum.length),
    icon: row.icon,
    themeColor: row.theme_color,
    displayOrder: Number(row.display_order || 0),
    comingSoon: Boolean(row.coming_soon),
    popular: Boolean(row.popular),
    enrollmentOpen: Boolean(row.enrollment_open),
    accessType: row.access_type || 'free',
    price: Number(row.price || 0),
    currency: row.currency || 'INR',
    lastUpdated: row.last_updated,
    version: row.version,
    technologies,
    curriculum,
    seo: seo || {
      title: row.title,
      description: row.short_description || '',
      keywords: [],
    },
  };
}

function legacyCourseToApi(course) {
  return {
    ...course,
    shortDescription: course.shortDescription,
    displayOrder: course.displayOrder,
    themeColor: course.themeColor,
    comingSoon: course.comingSoon,
    enrollmentOpen: course.enrollmentOpen,
  };
}

async function loadCourseFromDb(slug) {
  const [rows] = await pool.query(
    `SELECT * FROM courses WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug]
  );
  if (!rows.length) return null;
  const courseId = rows[0].id;

  const [techRows] = await pool.query(
    'SELECT technology FROM course_technologies WHERE course_id = ? ORDER BY display_order ASC, technology ASC',
    [courseId]
  );
  const [moduleRows] = await pool.query(
    'SELECT id, module_name, description FROM course_modules WHERE course_id = ? ORDER BY display_order ASC, module_name ASC',
    [courseId]
  );
  let topicRows = [];
  if (moduleRows.length) {
    [topicRows] = await pool.query(
      `SELECT module_id, topic FROM course_module_topics
       WHERE module_id IN (${moduleRows.map(() => '?').join(',')})
       ORDER BY display_order ASC, topic ASC`,
      moduleRows.map((m) => m.id)
    );
  }
  const [lessonRows] = await pool.query(
    `SELECT id, module_id, title, slug, description, what_you_learn_html, lesson_type, duration_minutes, is_preview, status, display_order
     FROM course_lessons WHERE module_id IN (${moduleRows.map(() => '?').join(',') || 'NULL'})
     ORDER BY display_order ASC, title ASC`,
    moduleRows.map((m) => m.id)
  );
  const lessonIds = lessonRows.map((l) => l.id);
  const [contentRows] = lessonIds.length ? await pool.query(
    `SELECT lesson_id, content_type, title, content_url, content_html, display_order FROM lesson_content
     WHERE lesson_id IN (${lessonIds.map(() => '?').join(',')}) ORDER BY display_order ASC, title ASC`, lessonIds
  ) : [[]];
  const [labRows] = lessonIds.length ? await pool.query(
    `SELECT id, lesson_id, lab_type, title, external_url, instructions, dataset_url, config_json, display_order FROM lesson_labs
     WHERE lesson_id IN (${lessonIds.map(() => '?').join(',')}) ORDER BY display_order ASC, title ASC`, lessonIds
  ) : [[]];
  const [seoRows] = await pool.query(
    'SELECT meta_title, meta_description, focus_keyword, keywords, canonical_url, og_title, og_description, og_image, robots FROM course_seo WHERE course_id = ? LIMIT 1',
    [courseId]
  );
  const topicsByModule = new Map();
  for (const row of topicRows) {
    if (!topicsByModule.has(row.module_id)) topicsByModule.set(row.module_id, []);
    topicsByModule.get(row.module_id).push(row.topic);
  }
  const lessonsByModule = new Map();
  const contentByLesson = new Map();
  const labsByLesson = new Map();
  for (const row of contentRows) {
    if (!contentByLesson.has(row.lesson_id)) contentByLesson.set(row.lesson_id, []);
    contentByLesson.get(row.lesson_id).push({ contentType: row.content_type, title: row.title || '', contentUrl: row.content_url || '', contentHtml: row.content_html || '' });
  }
  for (const row of labRows) {
    if (!labsByLesson.has(row.lesson_id)) labsByLesson.set(row.lesson_id, []);
    labsByLesson.get(row.lesson_id).push({ id: row.id, labType: row.lab_type, title: row.title, externalUrl: row.external_url || '', instructions: row.instructions || '', datasetUrl: row.dataset_url || '', config: effectiveLabConfig(row) });
  }
  for (const lesson of lessonRows) {
    if (!lessonsByModule.has(lesson.module_id)) lessonsByModule.set(lesson.module_id, []);
    lessonsByModule.get(lesson.module_id).push({
      id: lesson.id, title: lesson.title, slug: lesson.slug, description: lesson.description || '',
      lessonType: lesson.lesson_type, durationMinutes: Number(lesson.duration_minutes || 0),
      isPreview: Boolean(lesson.is_preview), status: lesson.status,
      content: contentByLesson.get(lesson.id) || [], labs: labsByLesson.get(lesson.id) || []
    });
  }
  const curriculum = moduleRows.map((m) => ({
    id: m.id, module: m.module_name, description: m.description || '',
    topics: topicsByModule.get(m.id) || [], lessons: lessonsByModule.get(m.id) || [],
  }));
  const seoRow = seoRows[0];
  let keywords = [];
  if (seoRow?.keywords) {
    try { keywords = JSON.parse(seoRow.keywords); } catch { keywords = String(seoRow.keywords).split(',').map((x) => x.trim()).filter(Boolean); }
  }
  const seo = seoRow ? {
    title: seoRow.meta_title || rows[0].title,
    description: seoRow.meta_description || rows[0].short_description || '',
    keywords,
    focusKeyword: seoRow.focus_keyword || '',
    canonicalUrl: seoRow.canonical_url || '',
    ogTitle: seoRow.og_title || '',
    ogDescription: seoRow.og_description || '',
    ogImage: seoRow.og_image || rows[0].thumbnail || '',
    robots: seoRow.robots || 'index,follow',
  } : null;

  return mapCourseRow(rows[0], techRows.map((r) => r.technology), curriculum, seo);
}

app.get('/api/courses', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM courses WHERE status = 'published' ORDER BY display_order ASC, title ASC`
    );
    const courses = await Promise.all(rows.map((row) => loadCourseFromDb(row.slug)));
    return sendSuccess(res, courses.filter(Boolean));
  } catch (error) {
    // Keep the site working during the additive migration if the new tables
    // have not yet been imported. Once seeded, DB becomes the source of truth.
    console.warn('Courses DB API fallback:', error.message);
    return sendSuccess(res, legacyCourses.map(legacyCourseToApi));
  }
});

app.get('/api/courses/:slug', async (req, res) => {
  try {
    const course = await loadCourseFromDb(req.params.slug);
    if (course) return sendSuccess(res, course);
    const legacy = legacyCourses.find((item) => item.slug === req.params.slug);
    if (legacy) return sendSuccess(res, legacyCourseToApi(legacy));
    return sendError(res, 'Course not found.', 404);
  } catch (error) {
    console.warn('Course DB API fallback:', error.message);
    const legacy = legacyCourses.find((item) => item.slug === req.params.slug);
    if (legacy) return sendSuccess(res, legacyCourseToApi(legacy));
    return sendError(res, 'Course not found.', 404);
  }
});

// Record an authenticated student's course detail view. This is intentionally lightweight and non-blocking for the UI.
app.post('/api/courses/:slug/view', requireAuth('student'), async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT id, title, slug FROM courses WHERE slug = ? AND status = 'published' LIMIT 1`,
      [req.params.slug]
    );
    if (!courses.length) return sendError(res, 'Course not found.', 404);
    const course = courses[0];
    await pool.query(
      `INSERT INTO user_course_views (id, user_id, course_id, view_count, first_viewed_at, last_viewed_at)
       VALUES (?, ?, ?, 1, NOW(), NOW())
       ON DUPLICATE KEY UPDATE view_count = view_count + 1, last_viewed_at = NOW()`,
      [crypto.randomUUID(), req.user.id, course.id]
    );
    return sendSuccess(res, { viewed: true, course: { id: course.id, title: course.title, slug: course.slug } });
  } catch (error) {
    // Course viewing should never break the public course page if tracking table is not migrated yet.
    console.warn('Course view tracking error:', error.message);
    return sendSuccess(res, { viewed: false });
  }
});

// ---------- SQL Lab (read-only practice database) ----------
// SQL Lab deliberately uses a separate MySQL user/database. The fallback to the
// Academy credentials keeps older deployments compatible until the dedicated
// SQL_LAB_USER / SQL_LAB_PASSWORD variables are configured.
const SQL_LAB_DATABASE = process.env.SQL_LAB_DATABASE || '';
const SQL_LAB_USER = process.env.SQL_LAB_USER || process.env.DB_USER || '';
const SQL_LAB_PASSWORD = process.env.SQL_LAB_PASSWORD || process.env.DB_PASSWORD || '';
const sqlLabPool = mysql.createPool({
  ...dbConfig,
  user: SQL_LAB_USER,
  password: SQL_LAB_PASSWORD,
  database: SQL_LAB_DATABASE || undefined,
  connectionLimit: Number(process.env.SQL_LAB_CONNECTION_LIMIT || 5),
});

function splitSqlStatements(sql='') {
  const input = String(sql || '');
  const statements = [];
  let current = '';
  let quote = null;
  let lineComment = false;
  let blockComment = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];
    if (lineComment) {
      current += ch;
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      current += ch;
      if (ch === '*' && next === '/') { current += next; i++; blockComment = false; }
      continue;
    }
    if (!quote && ch === '-' && next === '-') { current += ch + next; i++; lineComment = true; continue; }
    if (!quote && ch === '/' && next === '*') { current += ch + next; i++; blockComment = true; continue; }
    if (quote) {
      current += ch;
      if (ch === quote) {
        if (next === quote) { current += next; i++; }
        else if (quote !== '`' && input[i - 1] === '\\') {}
        else quote = null;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; current += ch; continue; }
    if (ch === ';') {
      if (current.trim()) statements.push(current.trim());
      current = '';
    } else current += ch;
  }
  if (current.trim()) statements.push(current.trim());
  return statements.filter(Boolean);
}
function isSafeSql(sql='') {
  const normalized = String(sql).trim();
  if (!normalized || normalized.length > 50000) return false;
  const forbidden = /\b(DROP|DELETE|UPDATE|INSERT|ALTER|TRUNCATE|CREATE|RENAME|GRANT|REVOKE|LOAD|INTO\s+OUTFILE|INTO\s+DUMPFILE|CALL|SET|USE|SLEEP|BENCHMARK|LOAD_FILE|HANDLER|LOCK|UNLOCK)\b/i;
  return /^(SELECT|WITH|SHOW|DESCRIBE|DESC|EXPLAIN)\b/i.test(normalized) && !forbidden.test(normalized);
}
const embedLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Embedded resource limit reached. Please try again later.' },
});

app.post('/api/labs/embed/github-tree', embedLimiter, requireAuth('student'), async (req, res) => {
  try {
    const input = String(req.body?.url || '').trim();
    const parsed = new URL(input);
    if (parsed.protocol !== 'https:' || parsed.hostname.toLowerCase() !== 'github.com') {
      return sendError(res, 'Only GitHub repository/folder URLs are allowed.', 400);
    }
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return sendError(res, 'Invalid GitHub repository URL.', 400);
    const owner = parts[0];
    const repo = parts[1];
    if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return sendError(res, 'Invalid GitHub repository URL.', 400);
    let ref = 'main';
    let prefix = '';
    if (parts[2]?.toLowerCase() === 'tree') {
      ref = parts[3] || 'main';
      prefix = parts.slice(4).join('/');
    }
    if (!/^[A-Za-z0-9_.-]+$/.test(ref)) return sendError(res, 'Use a standard GitHub branch/tag name for embedded repositories.', 400);
    const upstream = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(ref)}?recursive=1`;
    const response = await fetch(upstream, { headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'Infinity-AI-Cloud-Academy-LMS/1.0' }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) return sendError(res, 'GitHub repository could not be loaded.', 502);
    const body = await response.json();
    const prefixWithSlash = prefix ? `${prefix.replace(/\/+$/, '')}/` : '';
    const entries = Array.isArray(body.tree) ? body.tree.filter(item => item.path.startsWith(prefixWithSlash) && item.path.length < 500).slice(0, 300).map(item => ({ path:item.path, type:item.type, size:Number(item.size||0) })) : [];
    return sendSuccess(res, { owner, repo, ref, prefix, entries, truncated:Boolean(body.truncated) });
  } catch (error) {
    return sendError(res, 'Unable to embed the GitHub repository.', 400);
  }
});

app.post('/api/labs/embed/github', embedLimiter, requireAuth('student'), async (req, res) => {
  try {
    const input = String(req.body?.url || '').trim();
    const parsed = new URL(input);
    if (parsed.protocol !== 'https:' || parsed.hostname.toLowerCase() !== 'github.com') {
      return sendError(res, 'Only GitHub file URLs are allowed.', 400);
    }
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 5 || parts[2].toLowerCase() !== 'blob') {
      return sendError(res, 'Use a GitHub file URL in /owner/repository/blob/branch/path format.', 400);
    }
    const owner = parts[0];
    const repo = parts[1];
    const ref = parts[3];
    const filePath = parts.slice(4).join('/');
    if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo) || !/^[A-Za-z0-9_.-]+$/.test(ref) || !filePath) {
      return sendError(res, 'Invalid GitHub file URL.', 400);
    }
    const upstream = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`;
    const response = await fetch(upstream, {
      headers: { 'User-Agent': 'Infinity-AI-Cloud-Academy-LMS/1.0' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return sendError(res, 'GitHub file could not be loaded.', 502);
    const contentType = response.headers.get('content-type') || '';
    if (contentType && !contentType.includes('text') && !contentType.includes('javascript') && !contentType.includes('json') && !contentType.includes('xml')) {
      return sendError(res, 'Only text/code GitHub files are supported in the embedded viewer.', 415);
    }
    const code = await response.text();
    if (code.length > 500000) return sendError(res, 'GitHub file is too large for the embedded viewer.', 413);
    return sendSuccess(res, { code, fileName: filePath.split('/').pop() || '' });
  } catch (error) {
    return sendError(res, 'Unable to embed the GitHub file.', 400);
  }
});

app.get('/api/labs/sql/schema', requireAuth('student'), async (req,res)=>{
  try {
    if(!SQL_LAB_DATABASE) return sendSuccess(res,{configured:false,tables:[]});
    const [tables]=await sqlLabPool.query(`SELECT TABLE_NAME AS name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=? AND TABLE_TYPE='BASE TABLE' ORDER BY TABLE_NAME`,[SQL_LAB_DATABASE]);
    return sendSuccess(res,{configured:true,database:SQL_LAB_DATABASE,tables:tables.map(t=>t.name)});
  } catch(e){console.error('SQL schema error:',e);return sendError(res,'Unable to load SQL Lab schema.',500);}
});
app.post('/api/labs/sql/execute', sqlLabLimiter, requireAuth('student'), async (req,res)=>{
  try {
    if(!SQL_LAB_DATABASE) return sendError(res,'SQL Lab is not configured. Set SQL_LAB_DATABASE on the server.',503);
    const sql=String(req.body.sql||'').trim();
    const statements=splitSqlStatements(sql);
    if(!statements.length || statements.length>25 || statements.some(s=>!isSafeSql(s))) {
      return sendError(res,'Only up to 25 read-only SELECT/CTE/SHOW/DESCRIBE/EXPLAIN statements are allowed. Separate queries with semicolons.');
    }
    const started=Date.now();
    const conn=await sqlLabPool.getConnection();
    try {
      await conn.query(`USE \`${SQL_LAB_DATABASE.replace(/`/g,'') }\``);
      const resultSets=[];
      for (let i=0;i<statements.length;i++) {
        const [rows,fields]=await conn.query(statements[i]);
        resultSets.push({index:i+1,sql:statements[i],rows,columns:fields.map(f=>f.name),rowCount:Array.isArray(rows)?rows.length:0});
      }
      const first=resultSets[0]||{rows:[],columns:[],rowCount:0};
      return sendSuccess(res,{multi:true,resultSets,rows:first.rows,columns:first.columns,rowCount:first.rowCount,executionMs:Date.now()-started});
    } finally { conn.release(); }
  } catch(e){console.error('SQL Lab execute error:',e);return sendError(res,e.sqlMessage||e.message||'SQL execution failed.',400);}
});

// ---------- LMS access, enrollment and learning APIs ----------
async function getCourseAccess(courseId, userId) {
  const [rows] = await pool.query(
    `SELECT ce.id, ce.status, ce.access_type, ce.start_date, ce.expiry_date
     FROM course_enrollments ce
     WHERE ce.course_id = ? AND ce.user_id = ? LIMIT 1`,
    [courseId, userId]
  );
  if (!rows.length) return null;
  const e = rows[0];
  const expired = e.expiry_date && new Date(e.expiry_date) < new Date();
  if (expired && e.status === 'ACTIVE') {
    await pool.query(`UPDATE course_enrollments SET status='EXPIRED', updated_at=NOW() WHERE id=?`, [e.id]);
    e.status = 'EXPIRED';
  }
  return e;
}

function mapEnrollment(row) {
  return {
    id: row.id, courseId: row.course_id, slug: row.slug, title: row.title,
    thumbnail: row.thumbnail || '', status: row.status, accessType: row.access_type,
    startDate: row.start_date, expiryDate: row.expiry_date,
    progressPercent: Number(row.progress_percent || 0), completedLessons: Number(row.completed_lessons || 0),
    totalLessons: Number(row.total_lessons || 0), lastAccessedAt: row.last_accessed_at || null,
  };
}

app.get('/api/courses/:slug/access', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT id, slug, title, access_type, price, currency, enrollment_open FROM courses WHERE slug=? AND status='published' LIMIT 1`, [req.params.slug]);
    if (!rows.length) return sendError(res, 'Course not found.', 404);
    if (!JWT_SECRET || !req.cookies.iaa_token) return sendSuccess(res, { authenticated:false, enrolled:false, access:false, course: rows[0] });
    try {
      const payload = jwt.verify(req.cookies.iaa_token, JWT_SECRET);
      if (payload.role !== 'student') return sendSuccess(res, { authenticated:false, enrolled:false, access:false, course: rows[0] });
      const enrollment = await getCourseAccess(rows[0].id, payload.sub);
      return sendSuccess(res, { authenticated:true, enrolled:Boolean(enrollment && enrollment.status==='ACTIVE'), access:Boolean(enrollment && enrollment.status==='ACTIVE'), enrollment, course: rows[0] });
    } catch { return sendSuccess(res, { authenticated:false, enrolled:false, access:false, course: rows[0] }); }
  } catch (error) { console.error('Course access error:', error); return sendError(res, 'Unable to check course access.', 500); }
});

app.post('/api/courses/:slug/enroll', requireAuth('student'), async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT id, slug, title, access_type, price, currency, enrollment_open FROM courses WHERE slug=? AND status='published' LIMIT 1`, [req.params.slug]);
    if (!rows.length) return sendError(res, 'Course not found.', 404);
    const course = rows[0];
    if (!course.enrollment_open) return sendError(res, 'Enrollment is currently closed.', 403);
    const existing = await getCourseAccess(course.id, req.user.id);
    if (existing?.status === 'ACTIVE') return sendSuccess(res, { enrolled:true, alreadyEnrolled:true, enrollment:existing });
    if (course.access_type === 'paid') return res.status(402).json({ success:false, message:'Payment is required before this course can be activated.', data:{ paymentRequired:true, course:{ id:course.id, slug:course.slug, title:course.title, price:Number(course.price||0), currency:course.currency||'INR' } } });
    if (course.access_type === 'invite') return sendError(res, 'This course is available by invitation or admin enrollment.', 403);
    const id = crypto.randomUUID();
    await pool.query(`INSERT INTO course_enrollments (id,user_id,course_id,status,access_type,start_date) VALUES (?,?,?,?,?,NOW()) ON DUPLICATE KEY UPDATE status='ACTIVE',access_type=VALUES(access_type),start_date=NOW(),updated_at=NOW()`, [id,req.user.id,course.id,'ACTIVE','FREE']);
    const enrollment = await getCourseAccess(course.id, req.user.id);
    return sendSuccess(res, { enrolled:true, enrollment }, 201);
  } catch (error) { console.error('Enrollment error:', error); return sendError(res, 'Unable to enroll in this course.', 500); }
});

app.get('/api/student/dashboard', requireAuth('student'), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.id AS course_id,c.slug,c.title,c.thumbnail,ce.id,ce.status,ce.access_type,ce.start_date,ce.expiry_date,
             COALESCE(SUM(CASE WHEN lp.status='COMPLETED' THEN 1 ELSE 0 END),0) completed_lessons,
             COUNT(cl.id) total_lessons,
             COALESCE(ROUND(100 * SUM(CASE WHEN lp.status='COMPLETED' THEN 1 ELSE 0 END) / NULLIF(COUNT(cl.id),0)),0) progress_percent,
             MAX(lp.last_accessed_at) last_accessed_at
      FROM course_enrollments ce
      JOIN courses c ON c.id=ce.course_id
      LEFT JOIN course_modules cm ON cm.course_id=c.id
      LEFT JOIN course_lessons cl ON cl.module_id=cm.id AND cl.status='published'
      LEFT JOIN lesson_progress lp ON lp.lesson_id=cl.id AND lp.user_id=ce.user_id
      WHERE ce.user_id=?
      GROUP BY c.id,c.slug,c.title,c.thumbnail,ce.id,ce.status,ce.access_type,ce.start_date,ce.expiry_date
      ORDER BY COALESCE(MAX(lp.last_accessed_at),ce.updated_at) DESC`, [req.user.id]);
    return sendSuccess(res, { user:req.user, courses:rows.map(mapEnrollment) });
  } catch (error) { console.error('Student dashboard error:', error); return sendError(res, 'Unable to load student dashboard.', 500); }
});

app.get('/api/courses/:slug/preview/:lessonSlug', async (req,res)=>{
  try {
    const [rows]=await pool.query(`SELECT cl.*,cm.course_id,c.title AS course_title,c.slug AS course_slug FROM course_lessons cl JOIN course_modules cm ON cm.id=cl.module_id JOIN courses c ON c.id=cm.course_id WHERE c.slug=? AND cl.slug=? AND cl.status='published' AND cl.is_preview=1 LIMIT 1`,[req.params.slug,req.params.lessonSlug]);
    if(!rows.length)return sendError(res,'Preview lesson not found.',404);
    const l=rows[0]; const [content]=await pool.query(`SELECT content_type,title,content_url,content_html,display_order FROM lesson_content WHERE lesson_id=? ORDER BY display_order,title`,[l.id]);
    const video = content.find(c=>c.content_type==='VIDEO' && c.title==='Course Video');
    const drive = content.find(c=>c.content_type==='EMBED' && c.title==='Google Drive PPT / PDF');
    return sendSuccess(res,{lesson:{id:l.id,title:l.title,slug:l.slug,description:l.description||'',whatYouLearnHtml:l.what_you_learn_html||'',lessonType:l.lesson_type,durationMinutes:Number(l.duration_minutes||0),videoEmbedUrl:video?.content_url||'',videoEmbedType:video?.content_html||'YOUTUBE',driveEmbedUrl:drive?.content_url||'',content:content.filter(c=>!((c.content_type==='VIDEO'&&c.title==='Course Video')||(c.content_type==='EMBED'&&c.title==='Google Drive PPT / PDF'))).map(c=>({contentType:c.content_type,title:c.title||'',contentUrl:c.content_url||'',contentHtml:c.content_html||''}))},course:{title:l.course_title,slug:l.course_slug}});
  }catch(e){console.error('Preview lesson error:',e);return sendError(res,'Unable to load preview.',500);}
});

app.get('/api/learn/courses/:slug', requireAuth('student'), async (req, res) => {
  try {
    const [courses] = await pool.query(`SELECT * FROM courses WHERE slug=? AND status='published' LIMIT 1`, [req.params.slug]);
    if (!courses.length) return sendError(res, 'Course not found.', 404);
    const course = courses[0];
    const enrollment = await getCourseAccess(course.id, req.user.id);
    if (!enrollment || enrollment.status !== 'ACTIVE') return sendError(res, 'You are not enrolled in this course.', 403);
    const full = await loadCourseFromDb(course.slug);
    return sendSuccess(res, { course:full, enrollment });
  } catch (error) { console.error('Learning course error:', error); return sendError(res, 'Unable to load course.', 500); }
});

app.get('/api/learn/courses/:slug/lessons/:lessonSlug', requireAuth('student'), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT cl.*,cm.course_id,c.slug AS course_slug,c.title AS course_title
      FROM course_lessons cl JOIN course_modules cm ON cm.id=cl.module_id JOIN courses c ON c.id=cm.course_id
      WHERE c.slug=? AND cl.slug=? AND cl.status='published' LIMIT 1`, [req.params.slug,req.params.lessonSlug]);
    if (!rows.length) return sendError(res, 'Lesson not found.', 404);
    const lesson = rows[0];
    const enrollment = await getCourseAccess(lesson.course_id, req.user.id);
    if (!enrollment || enrollment.status !== 'ACTIVE') return sendError(res, 'You are not enrolled in this course.', 403);
    const [content] = await pool.query(`SELECT content_type,title,content_url,content_html,display_order FROM lesson_content WHERE lesson_id=? ORDER BY display_order,title`, [lesson.id]);
    const [labs] = await pool.query(`SELECT id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order FROM lesson_labs WHERE lesson_id=? ORDER BY display_order,title`, [lesson.id]);
    const [progress] = await pool.query(`SELECT * FROM lesson_progress WHERE user_id=? AND lesson_id=? LIMIT 1`, [req.user.id,lesson.id]);
    // Build deterministic course navigation so the lesson player can expose Previous/Next
    // across module boundaries using the same published lesson ordering as the course sidebar.
    const [navigationRows] = await pool.query(`
      SELECT cl.id, cl.title, cl.slug, cl.display_order, cl.module_id, cm.module_name, cm.display_order AS module_display_order
      FROM course_lessons cl
      JOIN course_modules cm ON cm.id=cl.module_id
      WHERE cm.course_id=? AND cl.status='published'
      ORDER BY cm.display_order ASC, cm.module_name ASC, cl.display_order ASC, cl.title ASC`, [lesson.course_id]);
    const navIndex = navigationRows.findIndex(r => r.id === lesson.id);
    const previous = navIndex > 0 ? navigationRows[navIndex - 1] : null;
    const next = navIndex >= 0 && navIndex < navigationRows.length - 1 ? navigationRows[navIndex + 1] : null;
    const video = content.find(c=>c.content_type==='VIDEO' && c.title==='Course Video');
    const drive = content.find(c=>c.content_type==='EMBED' && c.title==='Google Drive PPT / PDF');
    return sendSuccess(res, { lesson:{
      id:lesson.id,title:lesson.title,slug:lesson.slug,description:lesson.description||'',
      moduleId:lesson.module_id,moduleName:lesson.module_name||'',
      whatYouLearnHtml:lesson.what_you_learn_html||'',lessonType:lesson.lesson_type,
      durationMinutes:Number(lesson.duration_minutes||0),isPreview:Boolean(lesson.is_preview),
      videoEmbedUrl:video?.content_url||'',videoEmbedType:video?.content_html||'YOUTUBE',
      driveEmbedUrl:drive?.content_url||'',
      content:content.filter(c=>!((c.content_type==='VIDEO' && c.title==='Course Video') || (c.content_type==='EMBED' && c.title==='Google Drive PPT / PDF'))).map(c=>({contentType:c.content_type,title:c.title||'',contentUrl:c.content_url||'',contentHtml:c.content_html||''})),
      labs:labs.map(l=>({id:l.id,labType:l.lab_type,title:l.title,externalUrl:l.external_url||'',instructions:l.instructions||'',datasetUrl:l.dataset_url||'',config:effectiveLabConfig(l)}))
    }, progress:progress[0]||null,
      navigation:{
        currentIndex:navIndex>=0?navIndex:0,total:navigationRows.length,
        previous:previous?{id:previous.id,title:previous.title,slug:previous.slug,moduleId:previous.module_id,moduleName:previous.module_name}:null,
        next:next?{id:next.id,title:next.title,slug:next.slug,moduleId:next.module_id,moduleName:next.module_name}:null
      }
    });
  } catch (error) { console.error('Lesson error:', error); return sendError(res, 'Unable to load lesson.', 500); }
});



app.get('/api/learn/courses/:slug/lessons/:lessonSlug/experience', requireAuth('student'), async (req,res)=>{
  try {
    const [rows]=await pool.query(`SELECT cl.*,cm.course_id,c.slug AS course_slug,c.title AS course_title
      FROM course_lessons cl JOIN course_modules cm ON cm.id=cl.module_id JOIN courses c ON c.id=cm.course_id
      WHERE c.slug=? AND cl.slug=? AND cl.status='published' LIMIT 1`,[req.params.slug,req.params.lessonSlug]);
    if(!rows.length) return sendError(res,'Lesson not found.',404);
    const lesson=rows[0];
    const enrollment=await getCourseAccess(lesson.course_id,req.user.id);
    if(!enrollment || enrollment.status!=='ACTIVE') return sendError(res,'You are not enrolled in this course.',403);
    const [visuals]=await pool.query(`SELECT id,title,image_url,alt_text,caption,display_order FROM lesson_visuals WHERE lesson_id=? ORDER BY display_order,title`,[lesson.id]).catch(()=>[[]]);
    const [practice]=await pool.query(`SELECT id,title,instructions,tasks_json FROM lesson_practice WHERE lesson_id=? AND status='published' ORDER BY display_order LIMIT 1`,[lesson.id]).catch(()=>[[]]);
    const [quizzes]=await pool.query(`SELECT id,title,passing_percent FROM course_quizzes WHERE lesson_id=? AND status='published' ORDER BY created_at DESC LIMIT 1`,[lesson.id]).catch(()=>[[]]);
    let questions=[];
    if(quizzes[0]){
      const [qs]=await pool.query(`SELECT id,question_text,options_json,difficulty,display_order FROM quiz_questions WHERE quiz_id=? AND status='published' ORDER BY display_order`,[quizzes[0].id]).catch(()=>[[]]);
      questions=qs.map(q=>({id:q.id,questionText:q.question_text,options:parseJsonSafe(q.options_json)||[],difficulty:q.difficulty}));
    }
    const [assignments]=await pool.query(`SELECT id,title,instructions,submission_type,status FROM course_assignments WHERE lesson_id=? AND status='published' ORDER BY created_at DESC LIMIT 1`,[lesson.id]).catch(()=>[[]]);
    const assignment=assignments[0]||null;
    let submission=null;
    if(assignment){
      const [sub]=await pool.query(`SELECT id,status,submission_type,submission_text,file_url,trainer_feedback,score,submitted_at FROM assignment_submissions WHERE assignment_id=? AND user_id=? ORDER BY submitted_at DESC LIMIT 1`,[assignment.id,req.user.id]).catch(()=>[[]]);
      submission=sub[0]||null;
    }
    return sendSuccess(res,{
      visuals:visuals.map(v=>({id:v.id,title:v.title,imageUrl:v.image_url,altText:v.alt_text||'',caption:v.caption||''})),
      practice:practice[0]?{id:practice[0].id,title:practice[0].title,instructions:practice[0].instructions||'',tasks:parseJsonSafe(practice[0].tasks_json)||[]}:null,
      quiz:quizzes[0]?{id:quizzes[0].id,title:quizzes[0].title,passingPercent:Number(quizzes[0].passing_percent||60),questions}:null,
      assignment:assignment?{id:assignment.id,title:assignment.title,instructions:assignment.instructions||'',submissionType:assignment.submission_type,submission}:null
    });
  } catch(e){ console.error('Learning experience error:',e); return sendError(res,'Unable to load lesson learning experience.',500); }
});

app.post('/api/learn/quizzes/:quizId/attempts', requireAuth('student'), async (req,res)=>{
  try{
    const answers=Array.isArray(req.body.answers)?req.body.answers:[];
    const [quizRows]=await pool.query(`SELECT q.*,cm.course_id FROM course_quizzes q LEFT JOIN course_lessons cl ON cl.id=q.lesson_id LEFT JOIN course_modules cm ON cm.id=cl.module_id WHERE q.id=? AND q.status='published' LIMIT 1`,[req.params.quizId]);
    if(!quizRows.length) return sendError(res,'Quiz not found.',404);
    const quiz=quizRows[0]; const enrollment=await getCourseAccess(quiz.course_id,req.user.id); if(!enrollment||enrollment.status!=='ACTIVE') return sendError(res,'Course enrollment required.',403);
    const [qs]=await pool.query(`SELECT id,correct_option,explanation FROM quiz_questions WHERE quiz_id=? AND status='published' ORDER BY display_order`,[quiz.id]);
    if(!qs.length) return sendError(res,'Quiz has no questions.',400);
    let correct=0; const results=qs.map((q,i)=>{const selected=Number(answers[i]);const ok=selected===Number(q.correct_option);if(ok)correct++;return {questionId:q.id,selected,correct:ok,explanation:q.explanation||''};});
    const score=Math.round(correct*100/qs.length); const passed=score>=Number(quiz.passing_percent||60)?1:0;
    await pool.query(`INSERT INTO quiz_attempts (id,quiz_id,user_id,score_percent,passed,answers_json) VALUES (?,?,?,?,?,?)`,[crypto.randomUUID(),quiz.id,req.user.id,score,passed,JSON.stringify(answers)]).catch(()=>{});
    return sendSuccess(res,{scorePercent:score,passed:Boolean(passed),correctCount:correct,totalQuestions:qs.length,results});
  }catch(e){console.error('Quiz attempt error:',e);return sendError(res,'Unable to submit quiz.',500);}
});

app.post('/api/learn/assignments/:assignmentId/submissions', requireAuth('student'), async (req,res)=>{
  try{
    const [rows]=await pool.query(`SELECT a.*,c.id course_id FROM course_assignments a JOIN courses c ON c.id=a.course_id WHERE a.id=? AND a.status='published' LIMIT 1`,[req.params.assignmentId]);
    if(!rows.length) return sendError(res,'Assignment not found.',404);
    const a=rows[0]; const enrollment=await getCourseAccess(a.course_id,req.user.id); if(!enrollment||enrollment.status!=='ACTIVE') return sendError(res,'Course enrollment required.',403);
    const type=['TEXT','LINK','CODE','FILE'].includes(String(req.body.submissionType||a.submission_type))?String(req.body.submissionType||a.submission_type):a.submission_type;
    const text=String(req.body.submissionText||'').trim(); const fileUrl=String(req.body.fileUrl||'').trim()||null;
    if(!text && !fileUrl) return sendError(res,'Please add your submission before sending.',400);
    const id=crypto.randomUUID();
    await pool.query(`INSERT INTO assignment_submissions (id,assignment_id,user_id,submission_type,submission_text,file_url) VALUES (?,?,?,?,?,?)`,[id,a.id,req.user.id,type,text||null,fileUrl]);
    return sendSuccess(res,{id,status:'SUBMITTED'});
  }catch(e){console.error('Assignment submission error:',e);return sendError(res,'Unable to submit assignment.',500);}
});

app.post('/api/learn/lessons/:lessonId/progress', requireAuth('student'), async (req, res) => {
  try {
    const percent=Math.max(0,Math.min(100,Number(req.body.progressPercent||0)));
    const status=percent>=100?'COMPLETED':percent>0?'IN_PROGRESS':'NOT_STARTED';
    const [lessons]=await pool.query(`SELECT cl.id,cm.course_id FROM course_lessons cl JOIN course_modules cm ON cm.id=cl.module_id WHERE cl.id=? LIMIT 1`,[req.params.lessonId]);
    if(!lessons.length) return sendError(res,'Lesson not found.',404);
    const enrollment=await getCourseAccess(lessons[0].course_id,req.user.id);
    if(!enrollment || enrollment.status!=='ACTIVE') return sendError(res,'Course enrollment required.',403);
    await pool.query(`INSERT INTO lesson_progress (id,user_id,lesson_id,status,progress_percent,started_at,completed_at,last_accessed_at) VALUES (?,?,?,?,?,IF(?<>'NOT_STARTED',NOW(),NULL),IF(?='COMPLETED',NOW(),NULL),NOW()) ON DUPLICATE KEY UPDATE status=VALUES(status),progress_percent=VALUES(progress_percent),started_at=COALESCE(started_at,VALUES(started_at)),completed_at=IF(VALUES(status)='COMPLETED',NOW(),completed_at),last_accessed_at=NOW(),updated_at=NOW()`,[crypto.randomUUID(),req.user.id,req.params.lessonId,status,percent,status,status]);
    return sendSuccess(res,{lessonId:req.params.lessonId,status,progressPercent:percent});
  } catch(error){console.error('Lesson progress error:',error);return sendError(res,'Unable to save lesson progress.',500);}
});

// ---------- Public lead/demo APIs ----------
app.post('/api/demo-registrations', demoLimiter, async (req, res) => {
  try {
    const { fullName, email, phone, course, experience } = req.body;
    if (!fullName || !email || !phone || !course || !experience) {
      return sendError(res, 'All demo registration fields are required.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendError(res, 'Invalid email address.');
    if (!/^\d{10}$/.test(String(phone))) return sendError(res, 'Invalid 10-digit phone number.');

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO demo_registrations
       (id, full_name, phone, email, course, experience, status)
       VALUES (?, ?, ?, ?, ?, ?, 'New')`,
      [id, String(fullName).trim(), String(phone).trim(), String(email).trim().toLowerCase(), String(course).trim(), String(experience).trim()]
    );

    return sendSuccess(res, { id }, 201);
  } catch (error) {
    console.error('Demo registration error:', error);
    return sendError(res, 'Unable to register for the demo.', 500);
  }
});

app.post('/api/contact', demoLimiter, async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;
    if (!name || !email || !message) return sendError(res, 'Name, email and message are required.');
    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO contact_messages (id, name, email, phone, course, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, String(name).trim(), String(email).trim().toLowerCase(), phone || null, course || null, String(message).trim()]
    );
    return sendSuccess(res, { id }, 201);
  } catch (error) {
    console.error('Contact form error:', error);
    return sendError(res, 'Unable to send your message.', 500);
  }
});


// ---------- Public CMS helpers ----------
function parseJsonOrCsv(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((x) => x.trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String).map((x) => x.trim()).filter(Boolean);
  } catch {}
  return String(value).split(',').map((x) => x.trim()).filter(Boolean);
}

function parseJsonSafe(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'object') return value;
  try { return JSON.parse(value); } catch { return null; }
}
function effectiveLabConfig(row) {
  const config = parseJsonSafe(row?.config_json) || {};
  // Backward compatibility: older deployments stored the SQL starter query
  // in lesson_labs.instructions. Treat that legacy value as SQL Practice when
  // config_json.starterSql has not yet been populated.
  if (String(row?.lab_type || '').toUpperCase() === 'SQL' && !String(config.starterSql || '').trim() && String(row?.instructions || '').trim()) {
    config.starterSql = String(row.instructions).trim();
  }
  return config;
}


function sanitizeHtml(input = '') {
  return String(input)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

function cleanLessonHtml(input = '', lessonTitle = '') {
  let html = sanitizeHtml(input);
  const title = String(lessonTitle || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const normalize = (value) => String(value || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim().toLowerCase();

  // Remove known generated boilerplate sections entirely. The actual teaching content remains.
  const removeSection = (source, headingPattern) => {
    const re = new RegExp(`<h[1-6][^>]*>\\s*${headingPattern}\\s*<\\/h[1-6]>[\\s\\S]*?(?=<h[1-6][^>]*>|$)`, 'i');
    return source.replace(re, '');
  };
  html = removeSection(html, 'what\\s+you\\s+will\\s+learn');
  html = removeSection(html, 'industry\\s+perspective');
  html = removeSection(html, 'hands[- ]on\\s+objective');
  html = removeSection(html, 'interview\\s+checkpoint');

  // Remove generated source/reference blocks from the lesson HTML; source links belong to LMS reference/lab fields.
  html = html.replace(/<(?:div|p|section)[^>]*>\s*(?:<[^>]+>)*\s*source\s*:\s*[\s\S]*?<\/(?:div|p|section)>/gi, '');
  html = html.replace(/<p[^>]*>\s*<strong>\s*module\s*:?\s*<\/strong>[\s\S]*?<\/p>/gi, '');
  html = html.replace(/<p[^>]*>\s*this\s+lesson\s+is\s+part\s+of\s+the\s+infinity\s+ai\s+cloud\s+academy[\s\S]*?<\/p>/gi, '');

  // Remove a duplicated lesson title only; keep meaningful headings.
  html = html.replace(/<h[1-6]([^>]*)>([\s\S]*?)<\/h[1-6]>/gi, (m, attrs, inner) => {
    const plain = normalize(inner);
    return (plain === title || plain === 'lesson content' || plain === 'course content') ? '' : m;
  });
  return html.replace(/(?:<p>\s*<\/p>|<div>\s*<\/div>|<section>\s*<\/section>)/gi, '').trim();
}

function slugify(value = '') {
  return String(value).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSeoInput(seo = {}) {
  return {
    meta_title: seo.meta_title ?? seo.title ?? null,
    meta_description: seo.meta_description ?? seo.description ?? null,
    focus_keyword: seo.focus_keyword ?? seo.focusKeyword ?? null,
    keywords: JSON.stringify(parseJsonOrCsv(seo.keywords)),
    canonical_url: seo.canonical_url ?? seo.canonicalUrl ?? null,
    og_title: seo.og_title ?? seo.ogTitle ?? null,
    og_description: seo.og_description ?? seo.ogDescription ?? null,
    og_image: seo.og_image ?? seo.ogImage ?? null,
    robots: seo.robots || 'index,follow',
    schema_json: seo.schema_json ? (typeof seo.schema_json === 'string' ? seo.schema_json : JSON.stringify(seo.schema_json)) : null,
  };
}

function mapSeoRow(row) {
  if (!row) return null;
  return {
    title: row.meta_title || '',
    description: row.meta_description || '',
    focusKeyword: row.focus_keyword || '',
    keywords: parseJsonOrCsv(row.keywords),
    canonicalUrl: row.canonical_url || '',
    ogTitle: row.og_title || '',
    ogDescription: row.og_description || '',
    ogImage: row.og_image || '',
    robots: row.robots || 'index,follow',
    schemaJson: row.schema_json || null,
  };
}

async function getCourseForAdmin(id) {
  const [rows] = await pool.query('SELECT * FROM courses WHERE id = ? LIMIT 1', [id]);
  if (!rows.length) return null;
  const course = rows[0];
  const [tech] = await pool.query('SELECT id, technology, display_order FROM course_technologies WHERE course_id = ? ORDER BY display_order, technology', [id]);
  const [mods] = await pool.query('SELECT id, module_name, description, display_order FROM course_modules WHERE course_id = ? ORDER BY display_order, module_name', [id]);
  let topics = [];
  if (mods.length) {
    [topics] = await pool.query(`SELECT id, module_id, topic, display_order FROM course_module_topics WHERE module_id IN (${mods.map(() => '?').join(',')}) ORDER BY display_order, topic`, mods.map((m) => m.id));
  }
  let lessons = [];
  if (mods.length) {
    [lessons] = await pool.query(`SELECT id, module_id, title, slug, description, what_you_learn_html, lesson_type, duration_minutes, is_preview, status, display_order FROM course_lessons WHERE module_id IN (${mods.map(() => '?').join(',')}) ORDER BY display_order, title`, mods.map((m) => m.id));
  }
  const lessonIds = lessons.map((l) => l.id);
  const [contents] = lessonIds.length ? await pool.query(`SELECT lesson_id, content_type, title, content_url, content_html, display_order FROM lesson_content WHERE lesson_id IN (${lessonIds.map(() => '?').join(',')}) ORDER BY display_order, title`, lessonIds) : [[]];
  const [assignments] = lessonIds.length ? await pool.query(`SELECT lesson_id,title,instructions,submission_type,status FROM course_assignments WHERE lesson_id IN (${lessonIds.map(() => '?').join(',')}) ORDER BY created_at DESC`, lessonIds).catch(()=>[[]]) : [[]];
  const [labs] = lessonIds.length ? await pool.query(`SELECT id, lesson_id, lab_type, title, external_url, instructions, dataset_url, config_json, display_order FROM lesson_labs WHERE lesson_id IN (${lessonIds.map(() => '?').join(',')}) ORDER BY display_order, title`, lessonIds) : [[]];
  const [seo] = await pool.query('SELECT * FROM course_seo WHERE course_id = ? LIMIT 1', [id]);
  const topicMap = new Map();
  topics.forEach((t) => { if (!topicMap.has(t.module_id)) topicMap.set(t.module_id, []); topicMap.get(t.module_id).push(t); });
  const lessonMap = new Map();
  lessons.forEach((l) => { if (!lessonMap.has(l.module_id)) lessonMap.set(l.module_id, []); lessonMap.get(l.module_id).push({ id:l.id,title:l.title,slug:l.slug,description:l.description||'',whatYouLearnHtml:l.what_you_learn_html||'',lessonType:l.lesson_type,durationMinutes:Number(l.duration_minutes||0),isPreview:Boolean(l.is_preview),status:l.status,videoEmbedUrl:'',videoEmbedType:'YOUTUBE',driveEmbedUrl:'',content:[],labs:[] }); });
  contents.forEach((c) => { for (const list of lessonMap.values()) { const lesson=list.find(l=>l.id===c.lesson_id); if(lesson) { if(c.content_type==='EMBED' && c.title==='Google Drive PPT / PDF') lesson.driveEmbedUrl=c.content_url||''; else if(c.content_type==='VIDEO' && c.title==='Course Video') { lesson.videoEmbedUrl=c.content_url||''; lesson.videoEmbedType=c.content_html||'YOUTUBE'; } else lesson.content.push({contentType:c.content_type,title:c.title||'',contentUrl:c.content_url||'',contentHtml:c.content_html||''}); } } });
  assignments.forEach((a) => { for (const list of lessonMap.values()) { const lesson=list.find(l=>l.id===a.lesson_id); if(lesson && !lesson.assignment.title) lesson.assignment={title:a.title||'',instructions:a.instructions||'',submissionType:a.submission_type||'TEXT',status:a.status||'draft'}; } });
  labs.forEach((lab) => { for (const list of lessonMap.values()) { const lesson=list.find(l=>l.id===lab.lesson_id); if(lesson) lesson.labs.push({id:lab.id,labType:lab.lab_type,title:lab.title,externalUrl:lab.external_url||'',instructions:lab.instructions||'',datasetUrl:lab.dataset_url||'',config:effectiveLabConfig(lab)}); } });
  return {
    ...mapCourseRow(course, tech.map((t) => t.technology), mods.map((m) => ({ id:m.id, module: m.module_name, description: m.description || '', topics: (topicMap.get(m.id) || []).map((t) => t.topic), lessons: lessonMap.get(m.id) || [] })), mapSeoRow(seo[0])),
    id: course.id, status: course.status, accessType: course.access_type || 'free', price:Number(course.price||0), currency:course.currency||'INR',
  };
}

function coursePayload(body) {
  const title = String(body.title || '').trim();
  const slug = slugify(body.slug || title);
  if (!title || !slug) throw new Error('Course title and slug are required.');
  return {
    title, slug,
    tagline: body.tagline || null,
    short_description: body.short_description ?? body.shortDescription ?? null,
    overview: body.overview || null,
    thumbnail: body.thumbnail || null,
    banner: body.banner || null,
    category: body.category || null,
    duration: body.duration || null,
    level: body.level || null,
    mode: body.mode || null,
    language: body.language || null,
    certificate_available: body.certificate_available ?? body.certificateAvailable ? 1 : 0,
    certificate_title: body.certificate_title ?? body.certificateTitle ?? null,
    featured: body.featured ? 1 : 0,
    students: body.students || null,
    rating: body.rating === '' || body.rating == null ? null : Number(body.rating),
    projects: Number(body.projects || 0),
    modules_count: Array.isArray(body.curriculum) ? body.curriculum.length : Number(body.modules_count || body.modules || 0),
    icon: body.icon || null,
    theme_color: body.theme_color ?? body.themeColor ?? null,
    display_order: Number(body.display_order ?? body.displayOrder ?? 0),
    coming_soon: body.coming_soon ?? body.comingSoon ? 1 : 0,
    popular: body.popular ? 1 : 0,
    enrollment_open: body.enrollment_open ?? body.enrollmentOpen ? 1 : 0,
    last_updated: body.last_updated || body.lastUpdated || null,
    version: body.version || null,
    access_type: ['free','paid','invite'].includes(body.accessType || body.access_type) ? (body.accessType || body.access_type) : 'free',
    price: Number(body.price || 0),
    currency: String(body.currency || 'INR').toUpperCase().slice(0,10),
    status: ['draft','published','archived'].includes(body.status) ? body.status : 'draft',
  };
}

function inferLessonType(title='') {
  const t = String(title).toLowerCase();
  if (t.includes('pyspark') || t.includes('spark')) return 'PYSPARK';
  if (t.includes('sql') || t.includes('query') || t.includes('join') || t.includes('select') || t.includes('cte') || t.includes('window')) return 'SQL';
  if (t.includes('python')) return 'PYTHON';
  return 'THEORY';
}

async function replaceCourseChildren(executor, courseId, body) {
  // IMPORTANT: Course CMS saves must NOT delete learning-experience rows.
  // The old implementation deleted all modules, which cascaded into lessons,
  // visuals, practice, quizzes, quiz questions and assignments. Updating a
  // Colab URL therefore made those sections disappear from the student page.
  //
  // This implementation preserves module/lesson IDs when they are present in
  // the admin payload. Only modules/lessons that were intentionally removed
  // from the curriculum are deleted.

  await executor.query('DELETE FROM course_technologies WHERE course_id = ?', [courseId]);
  const technologies = Array.isArray(body.technologies) ? body.technologies : parseJsonOrCsv(body.technologies);
  for (let i = 0; i < technologies.length; i++) {
    const technology = String(technologies[i] || '').trim();
    if (!technology) continue;
    await executor.query(
      'INSERT INTO course_technologies (id, course_id, technology, display_order) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), courseId, technology, i]
    );
  }

  const [existingModules] = await executor.query(
    'SELECT id FROM course_modules WHERE course_id = ?',
    [courseId]
  );
  const existingModuleIds = new Set(existingModules.map((r) => String(r.id)));

  const [existingLessons] = await executor.query(
    `SELECT cl.id, cl.module_id
       FROM course_lessons cl
       JOIN course_modules cm ON cm.id = cl.module_id
      WHERE cm.course_id = ?`,
    [courseId]
  );
  const existingLessonIds = new Set(existingLessons.map((r) => String(r.id)));
  const existingLessonModule = new Map(existingLessons.map((r) => [String(r.id), String(r.module_id)]));

  const keptModuleIds = new Set();
  const keptLessonIds = new Set();

  const curriculum = Array.isArray(body.curriculum) ? body.curriculum : [];

  for (let i = 0; i < curriculum.length; i++) {
    const module = curriculum[i] || {};
    const moduleName = String(module.module || module.module_name || '').trim();
    if (!moduleName) continue;

    let moduleId = String(module.id || '');
    const canReuseModule = moduleId && existingModuleIds.has(moduleId);

    if (!canReuseModule) {
      moduleId = crypto.randomUUID();
      await executor.query(
        'INSERT INTO course_modules (id, course_id, module_name, description, display_order) VALUES (?, ?, ?, ?, ?)',
        [moduleId, courseId, moduleName, String(module.description || '').trim() || null, i]
      );
    } else {
      await executor.query(
        'UPDATE course_modules SET module_name=?, description=?, display_order=? WHERE id=? AND course_id=?',
        [moduleName, String(module.description || '').trim() || null, i, moduleId, courseId]
      );
    }
    keptModuleIds.add(moduleId);

    // Topics are editor-owned curriculum metadata, so replace only these.
    await executor.query('DELETE FROM course_module_topics WHERE module_id = ?', [moduleId]);
    const topics = Array.isArray(module.topics) ? module.topics : [];
    for (let j = 0; j < topics.length; j++) {
      const topic = String(topics[j] || '').trim();
      if (!topic) continue;
      await executor.query(
        'INSERT INTO course_module_topics (id, module_id, topic, display_order) VALUES (?, ?, ?, ?)',
        [crypto.randomUUID(), moduleId, topic, j]
      );
    }

    const lessons = Array.isArray(module.lessons) && module.lessons.length
      ? module.lessons
      : topics.map((topic) => ({
          title: topic,
          slug: slugify(topic),
          lessonType: inferLessonType(topic),
          description: '',
          durationMinutes: 0,
          isPreview: false,
          status: 'published',
          content: [],
          labs: []
        }));

    for (let j = 0; j < lessons.length; j++) {
      const lesson = lessons[j] || {};
      const title = String(lesson.title || lesson.topic || '').trim();
      if (!title) continue;

      let lessonId = String(lesson.id || '');
      const canReuseLesson =
        lessonId &&
        existingLessonIds.has(lessonId) &&
        existingLessonModule.get(lessonId) === moduleId;

      const slug = slugify(lesson.slug || title) || `lesson-${j + 1}`;
      const lessonType = [
        'THEORY','SLIDES','VIDEO','SQL','PYTHON','PYSPARK',
        'QUIZ','ASSIGNMENT','PROJECT','LIVE','RESOURCE'
      ].includes(lesson.lessonType)
        ? lesson.lessonType
        : inferLessonType(title);

      if (!canReuseLesson) {
        lessonId = crypto.randomUUID();
        await executor.query(
          `INSERT INTO course_lessons
            (id,module_id,title,slug,description,what_you_learn_html,lesson_type,duration_minutes,is_preview,status,display_order)
           VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            lessonId,
            moduleId,
            title,
            slug,
            String(lesson.description || '').trim() || null,
            cleanLessonHtml(lesson.whatYouLearnHtml || '', ''),
            lessonType,
            Number(lesson.durationMinutes || 0),
            lesson.isPreview ? 1 : 0,
            ['draft','published','archived'].includes(lesson.status) ? lesson.status : 'published',
            j
          ]
        );
      } else {
        await executor.query(
          `UPDATE course_lessons
              SET module_id=?, title=?, slug=?, description=?, what_you_learn_html=?, lesson_type=?,
                  duration_minutes=?, is_preview=?, status=?, display_order=?
            WHERE id=?`,
          [
            moduleId,
            title,
            slug,
            String(lesson.description || '').trim() || null,
            cleanLessonHtml(lesson.whatYouLearnHtml || '', ''),
            lessonType,
            Number(lesson.durationMinutes || 0),
            lesson.isPreview ? 1 : 0,
            ['draft','published','archived'].includes(lesson.status) ? lesson.status : 'published',
            j,
            lessonId
          ]
        );
      }

      keptLessonIds.add(lessonId);

      // Content and labs are editor-owned rows, so replace only these two sets.
      // Learning-experience rows (visual/practice/quiz/assignment) are deliberately
      // NOT deleted here.
      await executor.query('DELETE FROM lesson_content WHERE lesson_id = ?', [lessonId]);
      const videoEmbedUrl = String(lesson.videoEmbedUrl || '').trim();
      const videoEmbedType = ['YOUTUBE','GOOGLE_DRIVE'].includes(String(lesson.videoEmbedType || 'YOUTUBE')) ? String(lesson.videoEmbedType || 'YOUTUBE') : 'YOUTUBE';
      if (videoEmbedUrl) {
        await executor.query(
          `INSERT INTO lesson_content (id,lesson_id,content_type,title,content_url,content_html,display_order) VALUES (?,?,?,?,?,?,?)`,
          [crypto.randomUUID(), lessonId, 'VIDEO', 'Course Video', videoEmbedUrl, videoEmbedType, -2]
        );
      }
      const driveEmbedUrl = String(lesson.driveEmbedUrl || '').trim();
      if (driveEmbedUrl) {
        await executor.query(
          `INSERT INTO lesson_content (id,lesson_id,content_type,title,content_url,content_html,display_order) VALUES (?,?,?,?,?,?,?)`,
          [crypto.randomUUID(), lessonId, 'EMBED', 'Google Drive PPT / PDF', driveEmbedUrl, null, -1]
        );
      }
      const contents = Array.isArray(lesson.content) ? lesson.content : [];
      for (let k = 0; k < contents.length; k++) {
        const c = contents[k] || {};
        if (!c.contentType) continue;
        await executor.query(
          `INSERT INTO lesson_content
            (id,lesson_id,content_type,title,content_url,content_html,display_order)
           VALUES (?,?,?,?,?,?,?)`,
          [
            crypto.randomUUID(),
            lessonId,
            c.contentType,
            c.title || null,
            c.contentUrl || null,
            cleanLessonHtml(c.contentHtml || '', title),
            k
          ]
        );
      }

      await executor.query('DELETE FROM lesson_labs WHERE lesson_id = ?', [lessonId]);
      const labs = Array.isArray(lesson.labs) ? lesson.labs : [];
      for (let k = 0; k < labs.length; k++) {
        const lab = labs[k] || {};
        if (!lab.labType || !lab.title) continue;
        await executor.query(
          `INSERT INTO lesson_labs
            (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order)
           VALUES (?,?,?,?,?,?,?,?,?)`,
          [
            crypto.randomUUID(),
            lessonId,
            lab.labType,
            lab.title,
            lab.externalUrl || null,
            null,
            lab.datasetUrl || null,
            lab.config ? JSON.stringify({ ...lab.config, ...(lab.labType === 'SQL' ? { starterSql: String(lab.config.starterSql || '').trim() } : {}) }) : null,
            k
          ]
        );
      }

      // Assignment is lesson-owned and is intentionally replaced from the CMS payload.
      await executor.query('DELETE FROM course_assignments WHERE lesson_id = ?', [lessonId]);
      const assignment = lesson.assignment || null;
      if (assignment && String(assignment.title || '').trim() && String(assignment.instructions || '').trim()) {
        await executor.query(
          `INSERT INTO course_assignments (id,course_id,lesson_id,title,instructions,submission_type,status) VALUES (?,?,?,?,?,?,?)`,
          [crypto.randomUUID(), courseId, lessonId, String(assignment.title).trim(), String(assignment.instructions), ['TEXT','LINK','FILE','CODE'].includes(assignment.submissionType) ? assignment.submissionType : 'TEXT', ['draft','published'].includes(assignment.status) ? assignment.status : 'published']
        );
      }
    }
  }

  // Remove curriculum items that the admin actually deleted.
  // Cascades will clean their lesson-owned learning experience safely.
  for (const lessonId of existingLessonIds) {
    if (!keptLessonIds.has(lessonId)) {
      await executor.query('DELETE FROM course_lessons WHERE id=?', [lessonId]);
    }
  }
  for (const moduleId of existingModuleIds) {
    if (!keptModuleIds.has(moduleId)) {
      await executor.query('DELETE FROM course_modules WHERE id=? AND course_id=?', [moduleId, courseId]);
    }
  }

  const seo = normalizeSeoInput(body.seo || {});
  await executor.query(
    `INSERT INTO course_seo
      (id, course_id, meta_title, meta_description, focus_keyword, keywords,
       canonical_url, og_title, og_description, og_image, robots, schema_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       meta_title=VALUES(meta_title),
       meta_description=VALUES(meta_description),
       focus_keyword=VALUES(focus_keyword),
       keywords=VALUES(keywords),
       canonical_url=VALUES(canonical_url),
       og_title=VALUES(og_title),
       og_description=VALUES(og_description),
       og_image=VALUES(og_image),
       robots=VALUES(robots),
       schema_json=VALUES(schema_json)`,
    [
      crypto.randomUUID(),
      courseId,
      seo.meta_title,
      seo.meta_description,
      seo.focus_keyword,
      seo.keywords,
      seo.canonical_url,
      seo.og_title,
      seo.og_description,
      seo.og_image,
      seo.robots,
      seo.schema_json
    ]
  );
}

function mapPost(row, seo) {
  return {
    id: row.id, slug: row.slug, title: row.title, excerpt: row.excerpt || '', content: row.content || '', featuredImage: row.featured_image || '',
    category: row.category || '', tags: parseJsonOrCsv(row.tags), authorName: row.author_name || '', status: row.status,
    featured: Boolean(row.featured), publishedAt: row.published_at, createdAt: row.created_at, updatedAt: row.updated_at,
    url: `/blog/${row.slug}`,
    seo: mapSeoRow(seo),
  };
}

function mapPage(row, seo) {
  return {
    id: row.id, slug: row.slug, title: row.title, excerpt: row.excerpt || '', content: row.content || '', featuredImage: row.featured_image || '',
    authorName: row.author_name || '', status: row.status, publishedAt: row.published_at, createdAt: row.created_at, updatedAt: row.updated_at,
    url: `/page/${row.slug}`, seo: mapSeoRow(seo),
  };
}

async function getPostById(id) {
  const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [id]); if (!rows.length) return null;
  const [seo] = await pool.query('SELECT * FROM post_seo WHERE post_id = ? LIMIT 1', [id]); return mapPost(rows[0], seo[0]);
}
async function getPageById(id) {
  const [rows] = await pool.query('SELECT * FROM site_pages WHERE id = ? LIMIT 1', [id]); if (!rows.length) return null;
  const [seo] = await pool.query('SELECT * FROM page_seo WHERE page_id = ? LIMIT 1', [id]); return mapPage(rows[0], seo[0]);
}

// ---------- Public blog/page APIs ----------
app.get('/api/site-seo', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM site_seo_settings LIMIT 1'); return sendSuccess(res, rows[0] || {}); }
  catch { return sendSuccess(res, {}); }
});

app.get('/api/blog', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog_posts WHERE status='published' ORDER BY COALESCE(published_at, created_at) DESC`);
    const out = [];
    for (const row of rows) { const [seo] = await pool.query('SELECT * FROM post_seo WHERE post_id=? LIMIT 1', [row.id]); out.push(mapPost(row, seo[0])); }
    return sendSuccess(res, out);
  } catch (error) { return sendError(res, 'Unable to load blog posts.', 500); }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM blog_posts WHERE slug=? AND status='published' LIMIT 1`, [req.params.slug]);
    if (!rows.length) return sendError(res, 'Post not found.', 404);
    const [seo] = await pool.query('SELECT * FROM post_seo WHERE post_id=? LIMIT 1', [rows[0].id]);
    return sendSuccess(res, mapPost(rows[0], seo[0]));
  } catch { return sendError(res, 'Post not found.', 404); }
});

app.get('/api/pages/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM site_pages WHERE slug=? AND status='published' LIMIT 1`, [req.params.slug]);
    if (!rows.length) return sendError(res, 'Page not found.', 404);
    const [seo] = await pool.query('SELECT * FROM page_seo WHERE page_id=? LIMIT 1', [rows[0].id]);
    return sendSuccess(res, mapPage(rows[0], seo[0]));
  } catch { return sendError(res, 'Page not found.', 404); }
});

// ---------- Admin ----------
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    if (authConfigError(res)) return;
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Email and password are required.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const [rows] = await pool.query(
      'SELECT id, email, password_hash, full_name, role, status FROM admins WHERE email = ? LIMIT 1',
      [normalizedEmail]
    );
    if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return sendError(res, 'Invalid email or password.', 401);
    }
    if (rows[0].status !== 'Active') return sendError(res, 'Your account has been disabled.', 403);

    await pool.query('UPDATE admins SET last_login = NOW() WHERE id = ?', [rows[0].id]);
    const token = createToken({ sub: rows[0].id, role: 'admin' });
    setAuthCookie(res, token);

    return sendSuccess(res, {
      id: rows[0].id,
      email: rows[0].email,
      full_name: rows[0].full_name,
      role: rows[0].role,
      status: rows[0].status,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return sendError(res, 'Unable to login.', 500);
  }
});

app.post('/api/admin/logout', (req, res) => {
  clearAuthCookie(res);
  return sendSuccess(res, { logged_out: true });
});

app.get('/api/admin/me', requireAuth('admin'), (req, res) => sendSuccess(res, req.admin));

app.get('/api/admin/leads', requireAuth('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM demo_registrations ORDER BY created_at DESC');
    return sendSuccess(res, rows);
  } catch (error) {
    console.error('Get leads error:', error);
    return sendError(res, 'Unable to load leads.', 500);
  }
});

app.get('/api/admin/leads/recent', requireAuth('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM demo_registrations ORDER BY created_at DESC LIMIT 10');
    return sendSuccess(res, rows);
  } catch (error) {
    console.error('Get recent leads error:', error);
    return sendError(res, 'Unable to load recent leads.', 500);
  }
});

app.get('/api/admin/leads/:id', requireAuth('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM demo_registrations WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows.length) return sendError(res, 'Lead not found.', 404);
    return sendSuccess(res, rows[0]);
  } catch (error) {
    console.error('Get lead error:', error);
    return sendError(res, 'Unable to load lead.', 500);
  }
});

app.patch('/api/admin/leads/:id', requireAuth('admin'), async (req, res) => {
  try {
    const allowed = ['status', 'notes', 'follow_up_date'];
    const updates = Object.entries(req.body).filter(([key]) => allowed.includes(key));
    if (!updates.length) return sendError(res, 'No editable fields supplied.');

    const values = updates.map(([, value]) => value === '' ? null : value);
    const setClause = updates.map(([key]) => `${key} = ?`).join(', ');
    await pool.query(`UPDATE demo_registrations SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, req.params.id]);

    const [rows] = await pool.query('SELECT * FROM demo_registrations WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows.length) return sendError(res, 'Lead not found.', 404);
    return sendSuccess(res, rows[0]);
  } catch (error) {
    console.error('Update lead error:', error);
    return sendError(res, 'Unable to update lead.', 500);
  }
});

app.delete('/api/admin/leads/:id', requireAuth('admin'), async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM demo_registrations WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return sendError(res, 'Lead not found.', 404);
    return sendSuccess(res, { deleted: true });
  } catch (error) {
    console.error('Delete lead error:', error);
    return sendError(res, 'Unable to delete lead.', 500);
  }
});

app.get('/api/admin/stats', requireAuth('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(created_at >= CURDATE()) AS today,
        SUM(created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS week,
        SUM(YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())) AS month
      FROM demo_registrations
    `);
    const stats = rows[0];
    return sendSuccess(res, {
      today: Number(stats.today || 0),
      week: Number(stats.week || 0),
      month: Number(stats.month || 0),
      total: Number(stats.total || 0),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return sendError(res, 'Unable to load dashboard stats.', 500);
  }
});



// ---------- Admin: Students / Users ----------
app.get('/api/admin/users', requireAuth('admin'), async (req, res) => {
  try {
    const phoneColumn = await hasDbColumn('users', 'phone');
    const [rows] = await pool.query(`
      SELECT id, full_name, email, ${phoneColumn ? 'phone' : 'NULL AS phone'}, role, status, last_login, created_at, updated_at
      FROM users
      WHERE role = 'student'
      ORDER BY created_at DESC
    `);
    return sendSuccess(res, rows);
  } catch (error) {
    console.error('Get users error:', error);
    return sendError(res, 'Unable to load students.', 500);
  }
});

app.get('/api/admin/users/:id', requireAuth('admin'), async (req, res) => {
  try {
    const phoneColumn = await hasDbColumn('users', 'phone');
    const [rows] = await pool.query(`
      SELECT id, full_name, email, ${phoneColumn ? 'phone' : 'NULL AS phone'}, role, status, last_login, created_at, updated_at
      FROM users WHERE id = ? AND role = 'student' LIMIT 1
    `, [req.params.id]);
    if (!rows.length) return sendError(res, 'Student not found.', 404);

    let views = [];
    if (await hasDbTable('user_course_views') && await hasDbTable('courses')) {
      [views] = await pool.query(`
        SELECT c.id, c.title, c.slug, v.view_count, v.first_viewed_at, v.last_viewed_at
        FROM user_course_views v
        INNER JOIN courses c ON c.id = v.course_id
        WHERE v.user_id = ?
        ORDER BY v.last_viewed_at DESC
      `, [req.params.id]);
    }

    let enrollments = [];
    if (await hasDbTable('course_enrollments')) {
      [enrollments] = await pool.query(`
        SELECT ce.id,ce.status,ce.access_type,ce.start_date,ce.expiry_date,c.id AS course_id,c.title,c.slug,
               COALESCE(SUM(CASE WHEN lp.status='COMPLETED' THEN 1 ELSE 0 END),0) completed_lessons,
               COUNT(cl.id) total_lessons,
               COALESCE(ROUND(100*SUM(CASE WHEN lp.status='COMPLETED' THEN 1 ELSE 0 END)/NULLIF(COUNT(cl.id),0)),0) progress_percent
        FROM course_enrollments ce JOIN courses c ON c.id=ce.course_id
        LEFT JOIN course_modules cm ON cm.course_id=c.id
        LEFT JOIN course_lessons cl ON cl.module_id=cm.id AND cl.status='published'
        LEFT JOIN lesson_progress lp ON lp.lesson_id=cl.id AND lp.user_id=ce.user_id
        WHERE ce.user_id=? GROUP BY ce.id,ce.status,ce.access_type,ce.start_date,ce.expiry_date,c.id,c.title,c.slug ORDER BY ce.created_at DESC`, [req.params.id]);
    }

    return sendSuccess(res, { ...rows[0], viewedCourses: views, enrollments });
  } catch (error) {
    console.error('Get student details error:', error);
    return sendError(res, 'Unable to load student details.', 500);
  }
});

app.patch('/api/admin/users/:id', requireAuth('admin'), async (req, res) => {
  try {
    const updates = {};
    if (req.body.status && ['Active', 'Disabled'].includes(req.body.status)) updates.status = req.body.status;
    if (req.body.phone !== undefined) {
      const phone = String(req.body.phone).trim();
      if (!/^\d{10}$/.test(phone)) return sendError(res, 'Mobile number must be exactly 10 digits.');
      updates.phone = phone;
    }
    if (!Object.keys(updates).length) return sendError(res, 'No editable fields supplied.');
    const fields = Object.keys(updates);
    await pool.query(`UPDATE users SET ${fields.map((f) => `${f} = ?`).join(', ')}, updated_at = NOW() WHERE id = ? AND role = 'student'`, [...fields.map((f) => updates[f]), req.params.id]);
    const [rows] = await pool.query("SELECT id, full_name, email, phone, role, status, last_login, created_at, updated_at FROM users WHERE id = ? AND role = 'student' LIMIT 1", [req.params.id]);
    if (!rows.length) return sendError(res, 'Student not found.', 404);
    return sendSuccess(res, rows[0]);
  } catch (error) {
    console.error('Update student error:', error);
    return sendError(res, error.code === 'ER_DUP_ENTRY' ? 'Mobile number already belongs to another account.' : 'Unable to update student.', 400);
  }
});

// ---------- Admin CMS: Courses ----------
app.get('/api/admin/courses', requireAuth('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses ORDER BY display_order ASC, created_at DESC');
    return sendSuccess(res, rows.map((r) => ({ ...r, featured: Boolean(r.featured), coming_soon: Boolean(r.coming_soon), popular: Boolean(r.popular), enrollment_open: Boolean(r.enrollment_open) })));
  } catch (error) { console.error(error); return sendError(res, 'Unable to load courses.', 500); }
});

app.get('/api/admin/courses/:id', requireAuth('admin'), async (req, res) => {
  try { const course = await getCourseForAdmin(req.params.id); return course ? sendSuccess(res, course) : sendError(res, 'Course not found.', 404); }
  catch (error) { console.error(error); return sendError(res, 'Unable to load course.', 500); }
});

app.post('/api/admin/courses', requireAuth('admin'), async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const data = coursePayload(req.body);
    const id = crypto.randomUUID();
    await conn.beginTransaction();
    await conn.query(`INSERT INTO courses (id,slug,title,tagline,short_description,overview,thumbnail,banner,category,duration,level,mode,language,certificate_available,certificate_title,featured,students,rating,projects,modules_count,icon,theme_color,display_order,coming_soon,popular,enrollment_open,last_updated,version,access_type,price,currency,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, Object.values({id,...data}));
    await replaceCourseChildren(conn, id, req.body);
    await conn.commit();
    return sendSuccess(res, await getCourseForAdmin(id), 201);
  } catch (error) {
    try { await conn.rollback(); } catch {}
    console.error('Create course error:', error);
    return sendError(res, error.code === 'ER_DUP_ENTRY' ? 'Slug already exists.' : (error.message || 'Unable to create course.'), 400);
  } finally { conn.release(); }
});

app.put('/api/admin/courses/:id', requireAuth('admin'), async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const data = coursePayload(req.body);
    const id = req.params.id;
    await conn.beginTransaction();
    const [existing] = await conn.query('SELECT id FROM courses WHERE id=? LIMIT 1', [id]);
    if (!existing.length) { await conn.rollback(); return sendError(res, 'Course not found.', 404); }
    const fields = Object.keys(data);
    await conn.query(`UPDATE courses SET ${fields.map(f => `${f}=?`).join(',')}, updated_at=NOW() WHERE id=?`, [...fields.map(f => data[f]), id]);
    await replaceCourseChildren(conn, id, req.body);
    await conn.commit();
    return sendSuccess(res, await getCourseForAdmin(id));
  } catch (error) {
    try { await conn.rollback(); } catch {}
    console.error('Update course error:', error);
    return sendError(res, error.code === 'ER_DUP_ENTRY' ? 'Slug already exists.' : (error.message || 'Unable to update course.'), 400);
  } finally { conn.release(); }
});
app.delete('/api/admin/courses/:id', requireAuth('admin'), async (req,res)=>{ try { const [r]=await pool.query('DELETE FROM courses WHERE id=?',[req.params.id]); return r.affectedRows?sendSuccess(res,{deleted:true}):sendError(res,'Course not found.',404); } catch(error){console.error(error);return sendError(res,'Unable to delete course.',500);} });

// ---------- Admin LMS: enrollments ----------
app.get('/api/admin/enrollments', requireAuth('admin'), async (req,res)=>{
  try { const [rows]=await pool.query(`SELECT ce.*,u.full_name,u.email,c.title,c.slug FROM course_enrollments ce JOIN users u ON u.id=ce.user_id JOIN courses c ON c.id=ce.course_id ORDER BY ce.created_at DESC`); return sendSuccess(res,rows); }
  catch(e){console.error(e);return sendError(res,'Unable to load enrollments.',500);}
});
app.post('/api/admin/courses/:courseId/enroll', requireAuth('admin'), async (req,res)=>{
  try { const {userId,status='ACTIVE',accessType='ADMIN',expiryDate=null}=req.body; if(!userId)return sendError(res,'Student is required.'); const [c]=await pool.query(`SELECT id FROM courses WHERE id=? LIMIT 1`,[req.params.courseId]); if(!c.length)return sendError(res,'Course not found.',404); const [u]=await pool.query(`SELECT id FROM users WHERE id=? AND role='student' LIMIT 1`,[userId]); if(!u.length)return sendError(res,'Student not found.',404); await pool.query(`INSERT INTO course_enrollments (id,user_id,course_id,status,access_type,start_date,expiry_date) VALUES (?,?,?,?,?,NOW(),?) ON DUPLICATE KEY UPDATE status=VALUES(status),access_type=VALUES(access_type),expiry_date=VALUES(expiry_date),updated_at=NOW()`,[crypto.randomUUID(),userId,req.params.courseId,status,accessType,expiryDate]); const [rows]=await pool.query(`SELECT ce.*,u.full_name,u.email,c.title,c.slug FROM course_enrollments ce JOIN users u ON u.id=ce.user_id JOIN courses c ON c.id=ce.course_id WHERE ce.user_id=? AND ce.course_id=? LIMIT 1`,[userId,req.params.courseId]); return sendSuccess(res,rows[0],201); }
  catch(e){console.error(e);return sendError(res,'Unable to enroll student.',500);}
});
app.patch('/api/admin/enrollments/:id', requireAuth('admin'), async (req,res)=>{ try { const allowed=['PENDING','ACTIVE','EXPIRED','CANCELLED','COMPLETED']; const status=allowed.includes(req.body.status)?req.body.status:null; if(!status)return sendError(res,'Invalid enrollment status.'); await pool.query(`UPDATE course_enrollments SET status=?,expiry_date=?,updated_at=NOW() WHERE id=?`,[status,req.body.expiryDate||null,req.params.id]); const [rows]=await pool.query(`SELECT * FROM course_enrollments WHERE id=?`,[req.params.id]); return rows.length?sendSuccess(res,rows[0]):sendError(res,'Enrollment not found.',404); } catch(e){return sendError(res,'Unable to update enrollment.',500);} });

// ---------- Admin CMS: Posts ----------
app.get('/api/admin/posts', requireAuth('admin'), async (req,res)=>{ try { const [rows]=await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC'); const out=[]; for(const r of rows){const [seo]=await pool.query('SELECT * FROM post_seo WHERE post_id=? LIMIT 1',[r.id]);out.push(mapPost(r,seo[0]));} return sendSuccess(res,out);}catch(e){return sendError(res,'Unable to load posts.',500);} });
app.get('/api/admin/posts/:id', requireAuth('admin'), async (req,res)=>{ try {const x=await getPostById(req.params.id);return x?sendSuccess(res,x):sendError(res,'Post not found.',404);}catch(e){return sendError(res,'Unable to load post.',500);} });
app.post('/api/admin/posts', requireAuth('admin'), async (req,res)=>{ try {const title=String(req.body.title||'').trim(),slug=slugify(req.body.slug||title);if(!title||!slug)return sendError(res,'Post title and slug are required.');const id=crypto.randomUUID();const status=['draft','published','archived'].includes(req.body.status)?req.body.status:'draft';const publishedAt=status==='published'?(req.body.publishedAt||new Date()):null;await pool.query(`INSERT INTO blog_posts (id,slug,title,excerpt,content,featured_image,category,tags,author_name,status,featured,published_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,[id,slug,title,req.body.excerpt||null,sanitizeHtml(req.body.content||''),req.body.featuredImage||null,req.body.category||null,JSON.stringify(parseJsonOrCsv(req.body.tags)),req.body.authorName||req.admin.full_name,status,req.body.featured?1:0,publishedAt]);const seo=normalizeSeoInput(req.body.seo||{});await pool.query(`INSERT INTO post_seo (id,post_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots,schema_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,[crypto.randomUUID(),id,seo.meta_title,seo.meta_description,seo.focus_keyword,seo.keywords,seo.canonical_url,seo.og_title,seo.og_description,seo.og_image,seo.robots,seo.schema_json]);return sendSuccess(res,await getPostById(id),201);}catch(e){console.error(e);return sendError(res,e.code==='ER_DUP_ENTRY'?'Slug already exists.':(e.message||'Unable to create post.'),400);} });
app.put('/api/admin/posts/:id', requireAuth('admin'), async (req,res)=>{ try {const id=req.params.id;const [exists]=await pool.query('SELECT id FROM blog_posts WHERE id=? LIMIT 1',[id]);if(!exists.length)return sendError(res,'Post not found.',404);const title=String(req.body.title||'').trim(),slug=slugify(req.body.slug||title);if(!title||!slug)return sendError(res,'Post title and slug are required.');const status=['draft','published','archived'].includes(req.body.status)?req.body.status:'draft';const publishedAt=status==='published'?(req.body.publishedAt||new Date()):null;await pool.query(`UPDATE blog_posts SET slug=?,title=?,excerpt=?,content=?,featured_image=?,category=?,tags=?,author_name=?,status=?,featured=?,published_at=?,updated_at=NOW() WHERE id=?`,[slug,title,req.body.excerpt||null,sanitizeHtml(req.body.content||''),req.body.featuredImage||null,req.body.category||null,JSON.stringify(parseJsonOrCsv(req.body.tags)),req.body.authorName||req.admin.full_name,status,req.body.featured?1:0,publishedAt,id]);const seo=normalizeSeoInput(req.body.seo||{});await pool.query(`INSERT INTO post_seo (id,post_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots,schema_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title),meta_description=VALUES(meta_description),focus_keyword=VALUES(focus_keyword),keywords=VALUES(keywords),canonical_url=VALUES(canonical_url),og_title=VALUES(og_title),og_description=VALUES(og_description),og_image=VALUES(og_image),robots=VALUES(robots),schema_json=VALUES(schema_json)`,[crypto.randomUUID(),id,seo.meta_title,seo.meta_description,seo.focus_keyword,seo.keywords,seo.canonical_url,seo.og_title,seo.og_description,seo.og_image,seo.robots,seo.schema_json]);return sendSuccess(res,await getPostById(id));}catch(e){console.error(e);return sendError(res,e.code==='ER_DUP_ENTRY'?'Slug already exists.':(e.message||'Unable to update post.'),400);} });
app.delete('/api/admin/posts/:id', requireAuth('admin'), async (req,res)=>{try{const[r]=await pool.query('DELETE FROM blog_posts WHERE id=?',[req.params.id]);return r.affectedRows?sendSuccess(res,{deleted:true}):sendError(res,'Post not found.',404);}catch(e){return sendError(res,'Unable to delete post.',500);}});

// ---------- Admin CMS: Pages ----------
app.get('/api/admin/pages', requireAuth('admin'), async (req,res)=>{try{const[rows]=await pool.query('SELECT * FROM site_pages ORDER BY created_at DESC');const out=[];for(const r of rows){const[seo]=await pool.query('SELECT * FROM page_seo WHERE page_id=? LIMIT 1',[r.id]);out.push(mapPage(r,seo[0]));}return sendSuccess(res,out);}catch(e){return sendError(res,'Unable to load pages.',500);}});
app.get('/api/admin/pages/:id', requireAuth('admin'), async (req,res)=>{try{const x=await getPageById(req.params.id);return x?sendSuccess(res,x):sendError(res,'Page not found.',404);}catch(e){return sendError(res,'Unable to load page.',500);}});
app.post('/api/admin/pages', requireAuth('admin'), async (req,res)=>{try{const title=String(req.body.title||'').trim(),slug=slugify(req.body.slug||title);if(!title||!slug)return sendError(res,'Page title and slug are required.');const id=crypto.randomUUID();const status=['draft','published','archived'].includes(req.body.status)?req.body.status:'draft';const publishedAt=status==='published'?(req.body.publishedAt||new Date()):null;await pool.query(`INSERT INTO site_pages (id,slug,title,excerpt,content,featured_image,status,author_name,published_at) VALUES (?,?,?,?,?,?,?,?,?)`,[id,slug,title,req.body.excerpt||null,sanitizeHtml(req.body.content||''),req.body.featuredImage||null,status,req.body.authorName||req.admin.full_name,publishedAt]);const seo=normalizeSeoInput(req.body.seo||{});await pool.query(`INSERT INTO page_seo (id,page_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots,schema_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,[crypto.randomUUID(),id,seo.meta_title,seo.meta_description,seo.focus_keyword,seo.keywords,seo.canonical_url,seo.og_title,seo.og_description,seo.og_image,seo.robots,seo.schema_json]);return sendSuccess(res,await getPageById(id),201);}catch(e){return sendError(res,e.code==='ER_DUP_ENTRY'?'Slug already exists.':(e.message||'Unable to create page.'),400);}});
app.put('/api/admin/pages/:id', requireAuth('admin'), async (req,res)=>{try{const id=req.params.id;const[exists]=await pool.query('SELECT id FROM site_pages WHERE id=? LIMIT 1',[id]);if(!exists.length)return sendError(res,'Page not found.',404);const title=String(req.body.title||'').trim(),slug=slugify(req.body.slug||title);if(!title||!slug)return sendError(res,'Page title and slug are required.');const status=['draft','published','archived'].includes(req.body.status)?req.body.status:'draft';const publishedAt=status==='published'?(req.body.publishedAt||new Date()):null;await pool.query(`UPDATE site_pages SET slug=?,title=?,excerpt=?,content=?,featured_image=?,status=?,author_name=?,published_at=?,updated_at=NOW() WHERE id=?`,[slug,title,req.body.excerpt||null,sanitizeHtml(req.body.content||''),req.body.featuredImage||null,status,req.body.authorName||req.admin.full_name,publishedAt,id]);const seo=normalizeSeoInput(req.body.seo||{});await pool.query(`INSERT INTO page_seo (id,page_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots,schema_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title),meta_description=VALUES(meta_description),focus_keyword=VALUES(focus_keyword),keywords=VALUES(keywords),canonical_url=VALUES(canonical_url),og_title=VALUES(og_title),og_description=VALUES(og_description),og_image=VALUES(og_image),robots=VALUES(robots),schema_json=VALUES(schema_json)`,[crypto.randomUUID(),id,seo.meta_title,seo.meta_description,seo.focus_keyword,seo.keywords,seo.canonical_url,seo.og_title,seo.og_description,seo.og_image,seo.robots,seo.schema_json]);return sendSuccess(res,await getPageById(id));}catch(e){return sendError(res,e.code==='ER_DUP_ENTRY'?'Slug already exists.':(e.message||'Unable to update page.'),400);}});
app.delete('/api/admin/pages/:id', requireAuth('admin'), async (req,res)=>{try{const[r]=await pool.query('DELETE FROM site_pages WHERE id=?',[req.params.id]);return r.affectedRows?sendSuccess(res,{deleted:true}):sendError(res,'Page not found.',404);}catch(e){return sendError(res,'Unable to delete page.',500);}});

// ---------- Admin CMS: Global SEO ----------
app.get('/api/admin/seo', requireAuth('admin'), async (req,res)=>{try{const[rows]=await pool.query('SELECT * FROM site_seo_settings LIMIT 1');return sendSuccess(res,rows[0]||{});}catch(e){return sendError(res,'Unable to load SEO settings.',500);}});
app.put('/api/admin/seo', requireAuth('admin'), async (req,res)=>{try{const[rows]=await pool.query('SELECT id FROM site_seo_settings LIMIT 1');const id=rows[0]?.id||crypto.randomUUID();await pool.query(`INSERT INTO site_seo_settings (id,site_name,default_title,default_description,default_keywords,default_image,default_robots,google_verification,bing_verification,analytics_id) VALUES (?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE site_name=VALUES(site_name),default_title=VALUES(default_title),default_description=VALUES(default_description),default_keywords=VALUES(default_keywords),default_image=VALUES(default_image),default_robots=VALUES(default_robots),google_verification=VALUES(google_verification),bing_verification=VALUES(bing_verification),analytics_id=VALUES(analytics_id)`,[id,req.body.siteName||null,req.body.defaultTitle||null,req.body.defaultDescription||null,JSON.stringify(parseJsonOrCsv(req.body.defaultKeywords)),req.body.defaultImage||null,req.body.defaultRobots||'index,follow',req.body.googleVerification||null,req.body.bingVerification||null,req.body.analyticsId||null]);const[out]=await pool.query('SELECT * FROM site_seo_settings WHERE id=?',[id]);return sendSuccess(res,out[0]);}catch(e){console.error(e);return sendError(res,'Unable to update SEO settings.',500);}});

// ---------- Server-rendered SEO for course URLs + dynamic sitemap ----------
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function seoTag(name, content, property = false) {
  if (!content) return '';
  const attr = property ? 'property' : 'name';
  return `<meta ${attr}="${escapeHtml(name)}" content="${escapeHtml(content)}">`;
}

function buildCourseSeoHead(course) {
  const seo = course?.seo || {};
  const rawTitle = seo.title || course.title;
  const title = rawTitle.endsWith('| Infinity AI Cloud Academy') ? rawTitle : `${rawTitle} | Infinity AI Cloud Academy`;
  const description = seo.description || course.shortDescription || course.overview || '';
  const canonical = seo.canonicalUrl || `${process.env.APP_URL || 'https://infinityaicloudacademy.com'}/courses/${course.slug}`;
  const imagePath = seo.ogImage || course.thumbnail || '/academy.png';
  const image = imagePath.startsWith('http') ? imagePath : `${process.env.APP_URL || 'https://infinityaicloudacademy.com'}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description,
    url: canonical,
    image,
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${process.env.APP_URL || 'https://infinityaicloudacademy.com'}/#organization`,
      name: 'Infinity AI Cloud Academy',
      url: process.env.APP_URL || 'https://infinityaicloudacademy.com',
    },
    inLanguage: course.language || 'en',
    educationalLevel: course.level || undefined,
    teaches: course.technologies || [],
    keywords: seo.keywords || [],
  };
  return [
    `<title>${escapeHtml(title)} | Infinity AI Cloud Academy</title>`,
    seoTag('description', description),
    seoTag('robots', seo.robots || 'index,follow'),
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    seoTag('og:type', 'website', true),
    seoTag('og:title', title, true),
    seoTag('og:description', description, true),
    seoTag('og:url', canonical, true),
    seoTag('og:image', image, true),
    seoTag('og:site_name', 'Infinity AI Cloud Academy', true),
    seoTag('twitter:card', 'summary_large_image'),
    seoTag('twitter:title', title),
    seoTag('twitter:description', description),
    seoTag('twitter:image', image),
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  ].join('\n');
}

function buildContentSeoHead(item, type = 'website') {
  const seo = item?.seo || {};
  const rawTitle = seo.title || item.title;
  const title = rawTitle.endsWith('| Infinity AI Cloud Academy') ? rawTitle : `${rawTitle} | Infinity AI Cloud Academy`;
  const description = seo.description || item.excerpt || '';
  const base = process.env.APP_URL || 'https://infinityaicloudacademy.com';
  const canonical = seo.canonicalUrl || `${base}${item.url}`;
  const imagePath = seo.ogImage || item.featuredImage || '/academy.png';
  const image = imagePath.startsWith('http') ? imagePath : `${base}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  const schema = type === 'article' ? {
    '@context':'https://schema.org','@type':'BlogPosting',headline:item.title,description,url:canonical,image,
    datePublished:item.publishedAt || item.createdAt,dateModified:item.updatedAt || item.publishedAt || item.createdAt,
    author:{'@type':'Organization',name:'Infinity AI Cloud Academy'},publisher:{'@type':'Organization',name:'Infinity AI Cloud Academy',url:base}
  } : {'@context':'https://schema.org','@type':'WebPage',name:item.title,description,url:canonical,image};
  return [
    `<title>${escapeHtml(title)}</title>`, seoTag('description',description), seoTag('robots',seo.robots || 'index,follow'),
    `<link rel="canonical" href="${escapeHtml(canonical)}">`, seoTag('og:type',type,true), seoTag('og:title',title,true),
    seoTag('og:description',description,true), seoTag('og:url',canonical,true), seoTag('og:image',image,true),
    seoTag('twitter:card','summary_large_image'), seoTag('twitter:title',title), seoTag('twitter:description',description), seoTag('twitter:image',image),
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ].join('\n');
}

async function sendContentHtml(req,res,item,type='website') {
  const indexFile=path.join(distPath,'index.html'); let html=await fs.readFile(indexFile,'utf8');
  html=html.replace('</head>',`${buildContentSeoHead(item,type)}\n</head>`); return res.send(html);
}

async function sendCourseHtml(req, res, course) {
  const indexFile = path.join(distPath, 'index.html');
  let html = await fs.readFile(indexFile, 'utf8');
  html = html.replace('</head>', `${buildCourseSeoHead(course)}\n</head>`);
  return res.send(html);
}

app.get('/sitemap.xml', async (req, res) => {
  const base = process.env.APP_URL || 'https://infinityaicloudacademy.com';
  try {
    const [courseRows] = await pool.query(`SELECT slug, updated_at FROM courses WHERE status = 'published' ORDER BY display_order ASC, title ASC`);
    const [postRows] = await pool.query(`SELECT slug, updated_at, published_at FROM blog_posts WHERE status = 'published' ORDER BY COALESCE(published_at, created_at) DESC`);
    const [pageRows] = await pool.query(`SELECT slug, updated_at, published_at FROM site_pages WHERE status = 'published' ORDER BY created_at DESC`);
    const staticPaths = ['/', '/courses', '/blog', '/roadmaps', '/projects', '/resources', '/about', '/contact', '/book-demo', '/privacy-policy', '/terms'];
    const staticXml = staticPaths.map((p) => `<url><loc>${escapeHtml(base + p)}</loc></url>`).join('');
    const courseXml = courseRows.map((r) => `<url><loc>${escapeHtml(`${base}/courses/${encodeURIComponent(r.slug)}`)}</loc>${r.updated_at ? `<lastmod>${new Date(r.updated_at).toISOString().slice(0,10)}</lastmod>` : ''}</url>`).join('');
    const postXml = postRows.map((r) => `<url><loc>${escapeHtml(`${base}/blog/${encodeURIComponent(r.slug)}`)}</loc>${r.updated_at ? `<lastmod>${new Date(r.updated_at).toISOString().slice(0,10)}</lastmod>` : ''}</url>`).join('');
    const pageXml = pageRows.map((r) => `<url><loc>${escapeHtml(`${base}/page/${encodeURIComponent(r.slug)}`)}</loc>${r.updated_at ? `<lastmod>${new Date(r.updated_at).toISOString().slice(0,10)}</lastmod>` : ''}</url>`).join('');
    return res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticXml}${courseXml}${postXml}${pageXml}</urlset>`);
  } catch (error) {
    console.warn('Dynamic sitemap fallback:', error.message);
    return res.sendFile(path.join(distPath, 'sitemap.xml'));
  }
});

// Serve the Vite production build.
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { index: false }));

// React Router fallback. API routes must remain above this handler.
app.use(async (req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/') || req.path === '/sitemap.xml') return next();
  if (req.path.startsWith('/courses/')) {
    try {
      const slug = decodeURIComponent(req.path.slice('/courses/'.length).split('/')[0]);
      const course = await loadCourseFromDb(slug);
      if (course) return sendCourseHtml(req, res, course);
    } catch (error) {
      console.warn('Server SEO course lookup failed:', error.message);
    }
    const legacy = legacyCourses.find((item) => item.slug === decodeURIComponent(req.path.slice('/courses/'.length).split('/')[0]));
    if (legacy) return sendCourseHtml(req, res, legacyCourseToApi(legacy));
  }
  if (req.path.startsWith('/blog/')) {
    try {
      const slug = decodeURIComponent(req.path.slice('/blog/'.length).split('/')[0]);
      const [rows] = await pool.query(`SELECT * FROM blog_posts WHERE slug=? AND status='published' LIMIT 1`, [slug]);
      if (rows.length) {
        const [seo] = await pool.query('SELECT * FROM post_seo WHERE post_id=? LIMIT 1', [rows[0].id]);
        return sendContentHtml(req,res,mapPost(rows[0],seo[0]),'article');
      }
    } catch (error) { console.warn('Server SEO post lookup failed:', error.message); }
  }
  if (req.path.startsWith('/page/')) {
    try {
      const slug = decodeURIComponent(req.path.slice('/page/'.length).split('/')[0]);
      const [rows] = await pool.query(`SELECT * FROM site_pages WHERE slug=? AND status='published' LIMIT 1`, [slug]);
      if (rows.length) {
        const [seo] = await pool.query('SELECT * FROM page_seo WHERE page_id=? LIMIT 1', [rows[0].id]);
        return sendContentHtml(req,res,mapPage(rows[0],seo[0]),'website');
      }
    } catch (error) { console.warn('Server SEO page lookup failed:', error.message); }
  }
  return res.sendFile(path.join(distPath, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('Unhandled server error:', error);
  return sendError(res, 'Internal server error.', 500);
});

// Runtime compatibility checks for databases created before the Student CMS migration.
// These are intentionally additive: they never delete or rewrite existing application data.
async function ensureStudentRuntimeSchema() {
  try {
    const [userTable] = await pool.query(`
      SELECT COUNT(*) AS count
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
    `);
    if (!Number(userTable[0]?.count)) {
      console.warn('Student schema check: users table does not exist. Run db/schema.sql first.');
      return;
    }

    const [phoneColumn] = await pool.query(`
      SELECT COUNT(*) AS count
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'phone'
    `);
    if (!Number(phoneColumn[0]?.count)) {
      await pool.query(`ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL AFTER email`);
      console.log('Student schema check: added users.phone');
    }

    try {
      const [phoneIndex] = await pool.query(`SHOW INDEX FROM users WHERE Column_name = 'phone' AND Non_unique = 0`);
      if (!phoneIndex.length) {
        await pool.query(`ALTER TABLE users ADD UNIQUE KEY uq_users_phone (phone)`);
        console.log('Student schema check: added unique index on users.phone');
      }
    } catch (indexError) {
      console.warn('Student schema check: could not add unique phone index:', indexError.message);
    }

    const [courseTable] = await pool.query(`
      SELECT COUNT(*) AS count
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'courses'
    `);
    if (Number(courseTable[0]?.count)) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS user_course_views (
          id CHAR(36) NOT NULL PRIMARY KEY,
          user_id CHAR(36) NOT NULL,
          course_id CHAR(36) NOT NULL,
          view_count INT NOT NULL DEFAULT 1,
          first_viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          last_viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY uq_user_course_view (user_id, course_id),
          CONSTRAINT fk_user_course_view_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          CONSTRAINT fk_user_course_view_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          INDEX idx_user_course_views_user (user_id, last_viewed_at),
          INDEX idx_user_course_views_course (course_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }
  } catch (error) {
    // Do not prevent the existing site from starting if the DB user cannot ALTER/CREATE.
    console.warn('Student schema compatibility check failed:', error.message);
  }
}

async function startServer() {
  await ensureStudentRuntimeSchema();
  app.listen(PORT, '0.0.0.0', () => {

  console.log(`Infinity AI Cloud Academy server running on port ${PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV || 'development'}`);
  console.log(`APP_URL=${process.env.APP_URL || '(not set)'}`);
  console.log(`DB_HOST=${process.env.DB_HOST || '(not set)'}`);
  console.log(`DB_NAME=${process.env.DB_NAME || '(not set)'}`);
  });
}

startServer();
