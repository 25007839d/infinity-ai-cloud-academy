import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const courseSlug = args[args.indexOf('--course') + 1] || 'data-engineering';
const courseFile = path.join(root, 'content', 'courses', courseSlug, 'course.json');
const course = JSON.parse(await fs.readFile(courseFile, 'utf8'));

if (course.slug !== courseSlug) throw new Error(`Course manifest slug mismatch: ${course.slug}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
  charset: 'utf8mb4',
});

const id = () => crypto.randomUUID();
const bool = (v) => v ? 1 : 0;
const validLessonTypes = new Set(['THEORY','SLIDES','VIDEO','SQL','PYTHON','PYSPARK','QUIZ','ASSIGNMENT','PROJECT','LIVE','RESOURCE']);
const validContentTypes = new Set(['SLIDES','VIDEO','NOTES','ARTICLE','PDF','EMBED']);
const validLabTypes = new Set(['SQL','COLAB_PYTHON','COLAB_PYSPARK','INTERNAL_PYTHON','INTERNAL_PYSPARK']);

function courseRow(c) {
  return [
    c.slug, c.title, c.tagline || null, c.shortDescription || null, c.overview || null,
    c.thumbnail || null, c.banner || null, c.category || null, c.duration || null, c.level || null,
    c.mode || null, c.language || null, bool(c.certificateAvailable), c.certificateTitle || null,
    bool(c.featured), c.students || null, c.rating ?? null, Number(c.projects || 0), c.modules?.length || 0,
    c.icon || null, c.themeColor || null, Number(c.displayOrder || 0), bool(c.comingSoon), bool(c.popular),
    c.enrollmentOpen === false ? 0 : 1, c.lastUpdated || null, c.version || null,
    ['free','paid','invite'].includes(c.accessType) ? c.accessType : 'free', Number(c.price || 0),
    String(c.currency || 'INR').toUpperCase().slice(0,10), ['draft','published','archived'].includes(c.status) ? c.status : 'draft'
  ];
}

const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  const [existing] = await conn.query('SELECT id FROM courses WHERE slug=? LIMIT 1', [course.slug]);
  const courseId = existing[0]?.id || id();
  const values = courseRow(course);
  if (existing.length) {
    await conn.query(`UPDATE courses SET slug=?,title=?,tagline=?,short_description=?,overview=?,thumbnail=?,banner=?,category=?,duration=?,level=?,mode=?,language=?,certificate_available=?,certificate_title=?,featured=?,students=?,rating=?,projects=?,modules_count=?,icon=?,theme_color=?,display_order=?,coming_soon=?,popular=?,enrollment_open=?,last_updated=?,version=?,access_type=?,price=?,currency=?,status=?,updated_at=NOW() WHERE id=?`, [...values, courseId]);
    await conn.query('DELETE FROM course_technologies WHERE course_id=?', [courseId]);
    await conn.query('DELETE FROM course_modules WHERE course_id=?', [courseId]);
  } else {
    await conn.query(`INSERT INTO courses (id,slug,title,tagline,short_description,overview,thumbnail,banner,category,duration,level,mode,language,certificate_available,certificate_title,featured,students,rating,projects,modules_count,icon,theme_color,display_order,coming_soon,popular,enrollment_open,last_updated,version,access_type,price,currency,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [courseId, ...values]);
  }

  for (let i=0;i<(course.technologies||[]).length;i++) {
    await conn.query('INSERT INTO course_technologies (id,course_id,technology,display_order) VALUES (?,?,?,?)', [id(),courseId,String(course.technologies[i]),i]);
  }

  for (let mi=0; mi<(course.modules||[]).length; mi++) {
    const m=course.modules[mi]; const moduleId=id();
    await conn.query('INSERT INTO course_modules (id,course_id,module_name,description,display_order) VALUES (?,?,?,?,?)',[moduleId,courseId,m.title,m.description||null,mi]);
    for (let ti=0; ti<(m.lessons||[]).length; ti++) {
      const topic=m.lessons[ti];
      await conn.query('INSERT INTO course_module_topics (id,module_id,topic,display_order) VALUES (?,?,?,?)',[id(),moduleId,topic.title,ti]);
    }
    for (let li=0; li<(m.lessons||[]).length; li++) {
      const l=m.lessons[li]; const lessonId=id();
      const lessonType=validLessonTypes.has(l.lessonType)?l.lessonType:'THEORY';
      await conn.query('INSERT INTO course_lessons (id,module_id,title,slug,description,lesson_type,duration_minutes,is_preview,status,display_order) VALUES (?,?,?,?,?,?,?,?,?,?)',[lessonId,moduleId,l.title,l.slug,l.description||null,lessonType,Number(l.durationMinutes||0),bool(l.isPreview),['draft','published','archived'].includes(l.status)?l.status:'published',li]);
      for (let ci=0;ci<(l.content||[]).length;ci++) {
        const c=l.content[ci]; if(!validContentTypes.has(c.contentType)) continue;
        await conn.query('INSERT INTO lesson_content (id,lesson_id,content_type,title,content_url,content_html,display_order) VALUES (?,?,?,?,?,?,?)',[id(),lessonId,c.contentType,c.title||null,c.contentUrl||null,c.contentHtml||null,ci]);
      }
      for (let bi=0;bi<(l.labs||[]).length;bi++) {
        const lab=l.labs[bi]; if(!validLabTypes.has(lab.labType)) continue;
        await conn.query('INSERT INTO lesson_labs (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order) VALUES (?,?,?,?,?,?,?,?,?)',[id(),lessonId,lab.labType,lab.title,lab.externalUrl||null,lab.instructions||null,lab.datasetUrl||null,lab.config?JSON.stringify(lab.config):null,bi]);
      }
    }
  }

  const seo=course.seo||{};
  await conn.query(`INSERT INTO course_seo (id,course_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots,schema_json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title),meta_description=VALUES(meta_description),focus_keyword=VALUES(focus_keyword),keywords=VALUES(keywords),canonical_url=VALUES(canonical_url),og_title=VALUES(og_title),og_description=VALUES(og_description),og_image=VALUES(og_image),robots=VALUES(robots),schema_json=VALUES(schema_json)`,[id(),courseId,seo.metaTitle||course.title,seo.metaDescription||course.shortDescription||null,seo.focusKeyword||null,JSON.stringify(seo.keywords||[]),seo.canonicalUrl||null,seo.ogTitle||null,seo.ogDescription||null,seo.ogImage||null,seo.robots||'index,follow',seo.schemaJson?JSON.stringify(seo.schemaJson):null]);

  await conn.commit();
  console.log(`Synced course ${course.slug} (${course.modules?.length||0} modules) into ${process.env.DB_NAME}`);
} catch (err) {
  await conn.rollback();
  console.error(err);
  process.exitCode=1;
} finally { conn.release(); await pool.end(); }
