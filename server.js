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
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === 'production';

if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not configured. Set it in Hostinger Environment Variables.');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
  charset: 'utf8mb4',
});

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

function requireAuth(requiredRole = null) {
  return async (req, res, next) => {
    try {
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
        const [rows] = await pool.query(
          'SELECT id, email, full_name, role, status FROM users WHERE id = ? LIMIT 1',
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
    return sendSuccess(res, { status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Health DB error:', error.message);
    return sendError(res, 'Database connection failed.', 503);
  }
});

// ---------- Public authentication ----------
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password || !full_name) return sendError(res, 'Full name, email and password are required.');
    if (password.length < 8) return sendError(res, 'Password must be at least 8 characters.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [normalizedEmail]);
    if (existing.length) return sendError(res, 'An account with this email already exists.', 409);

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);

    await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role, status)
       VALUES (?, ?, ?, ?, 'student', 'Active')`,
      [id, normalizedEmail, passwordHash, String(full_name).trim()]
    );

    const token = createToken({ sub: id, role: 'student' });
    setAuthCookie(res, token);
    return sendSuccess(res, { id, email: normalizedEmail, full_name: String(full_name).trim(), role: 'student' }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return sendError(res, 'Unable to create account.', 500);
  }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Email and password are required.');

    const normalizedEmail = String(email).trim().toLowerCase();
    const [rows] = await pool.query(
      'SELECT id, email, password_hash, full_name, role, status FROM users WHERE email = ? LIMIT 1',
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

    return sendSuccess(res, { id: user.id, email: user.email, full_name: user.full_name, role: user.role });
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

    const [rows] = await pool.query(
      'SELECT id, email, full_name, role, status FROM users WHERE id = ? LIMIT 1',
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

// ---------- Admin ----------
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
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

// Serve the Vite production build.
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { index: false }));

// React Router fallback. API routes must remain above this handler.
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
  return res.sendFile(path.join(distPath, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('Unhandled server error:', error);
  return sendError(res, 'Internal server error.', 500);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Infinity AI Cloud Academy server running on port ${PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV || 'development'}`);
  console.log(`APP_URL=${process.env.APP_URL || '(not set)'}`);
  console.log(`DB_HOST=${process.env.DB_HOST || '(not set)'}`);
  console.log(`DB_NAME=${process.env.DB_NAME || '(not set)'}`);
});
