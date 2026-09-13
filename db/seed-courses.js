import 'dotenv/config';
import mysql from 'mysql2/promise';
import crypto from 'node:crypto';
import { courses } from '../src/data/courses.js';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  charset: 'utf8mb4',
});

const schema = `
CREATE TABLE IF NOT EXISTS courses (
  id CHAR(36) NOT NULL PRIMARY KEY, slug VARCHAR(180) NOT NULL UNIQUE, title VARCHAR(255) NOT NULL,
  tagline VARCHAR(500), short_description TEXT, overview TEXT, thumbnail VARCHAR(500), banner VARCHAR(500),
  category VARCHAR(150), duration VARCHAR(100), level VARCHAR(100), mode VARCHAR(100), language VARCHAR(100),
  certificate_available TINYINT(1) NOT NULL DEFAULT 0, certificate_title VARCHAR(255), featured TINYINT(1) DEFAULT 0,
  students VARCHAR(100), rating DECIMAL(3,2), projects INT DEFAULT 0, modules_count INT DEFAULT 0,
  icon VARCHAR(100), theme_color VARCHAR(100), display_order INT DEFAULT 0, coming_soon TINYINT(1) DEFAULT 0,
  popular TINYINT(1) DEFAULT 0, enrollment_open TINYINT(1) DEFAULT 1, last_updated DATE, version VARCHAR(50),
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_courses_status_order (status, display_order), INDEX idx_courses_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS course_technologies (
  id CHAR(36) PRIMARY KEY, course_id CHAR(36) NOT NULL, technology VARCHAR(150) NOT NULL, display_order INT DEFAULT 0,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE, INDEX idx_ct (course_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS course_modules (
  id CHAR(36) PRIMARY KEY, course_id CHAR(36) NOT NULL, module_name VARCHAR(255) NOT NULL, description TEXT,
  display_order INT DEFAULT 0, FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_cm (course_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS course_module_topics (
  id CHAR(36) PRIMARY KEY, module_id CHAR(36) NOT NULL, topic VARCHAR(255) NOT NULL, display_order INT DEFAULT 0,
  FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE, INDEX idx_cmt (module_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS course_seo (
  id CHAR(36) PRIMARY KEY, course_id CHAR(36) NOT NULL UNIQUE, meta_title VARCHAR(255), meta_description TEXT,
  focus_keyword VARCHAR(255), keywords TEXT, canonical_url VARCHAR(500), og_title VARCHAR(255),
  og_description TEXT, og_image VARCHAR(500), robots VARCHAR(100) DEFAULT 'index,follow', schema_json JSON,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

await pool.query(schema);
for (const course of courses) {
  const [existing] = await pool.query('SELECT id FROM courses WHERE slug=? LIMIT 1', [course.slug]);
  const courseId = existing[0]?.id || crypto.randomUUID();
  await pool.query(`
    INSERT INTO courses
      (id,slug,title,tagline,short_description,overview,thumbnail,banner,category,duration,level,mode,language,
       certificate_available,certificate_title,featured,students,rating,projects,modules_count,icon,theme_color,
       display_order,coming_soon,popular,enrollment_open,last_updated,version,status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE
      title=VALUES(title),tagline=VALUES(tagline),short_description=VALUES(short_description),overview=VALUES(overview),
      thumbnail=VALUES(thumbnail),banner=VALUES(banner),category=VALUES(category),duration=VALUES(duration),
      level=VALUES(level),mode=VALUES(mode),language=VALUES(language),certificate_available=VALUES(certificate_available),
      certificate_title=VALUES(certificate_title),featured=VALUES(featured),students=VALUES(students),rating=VALUES(rating),
      projects=VALUES(projects),modules_count=VALUES(modules_count),icon=VALUES(icon),theme_color=VALUES(theme_color),
      display_order=VALUES(display_order),coming_soon=VALUES(coming_soon),popular=VALUES(popular),
      enrollment_open=VALUES(enrollment_open),last_updated=VALUES(last_updated),version=VALUES(version),status='published'`,
    [courseId,course.slug,course.title,course.tagline||null,course.shortDescription||null,course.overview||null,
     course.thumbnail||null,course.banner||null,course.category||null,course.duration||null,course.level||null,
     course.mode||null,course.language||null,course.certificate?.available?1:0,course.certificate?.title||null,
     course.featured?1:0,course.students||null,course.rating??null,course.projects||0,course.modules||0,course.icon||null,
     course.themeColor||null,course.displayOrder||0,course.comingSoon?1:0,course.popular?1:0,course.enrollmentOpen!==false?1:0,
     course.lastUpdated||null,course.version||null,'published']);
  await pool.query('DELETE FROM course_technologies WHERE course_id=?',[courseId]);
  for (const [i, technology] of (course.technologies||[]).entries())
    await pool.query('INSERT INTO course_technologies (id,course_id,technology,display_order) VALUES (?,?,?,?)',[crypto.randomUUID(),courseId,technology,i+1]);
  const [oldMods] = await pool.query('SELECT id FROM course_modules WHERE course_id=?',[courseId]);
  if (oldMods.length) await pool.query(`DELETE FROM course_module_topics WHERE module_id IN (${oldMods.map(()=>'?').join(',')})`,oldMods.map(r=>r.id));
  await pool.query('DELETE FROM course_modules WHERE course_id=?',[courseId]);
  for (const [i, module] of (course.curriculum||[]).entries()) {
    const moduleId=crypto.randomUUID();
    await pool.query('INSERT INTO course_modules (id,course_id,module_name,display_order) VALUES (?,?,?,?)',[moduleId,courseId,module.module,i+1]);
    for (const [j,topic] of (module.topics||[]).entries())
      await pool.query('INSERT INTO course_module_topics (id,module_id,topic,display_order) VALUES (?,?,?,?)',[crypto.randomUUID(),moduleId,topic,j+1]);
  }
  const seo=course.seo||{};
  await pool.query(`
    INSERT INTO course_seo (id,course_id,meta_title,meta_description,focus_keyword,keywords,canonical_url,og_title,og_description,og_image,robots)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title),meta_description=VALUES(meta_description),
      keywords=VALUES(keywords),canonical_url=VALUES(canonical_url),og_title=VALUES(og_title),
      og_description=VALUES(og_description),og_image=VALUES(og_image),robots=VALUES(robots)`,
    [crypto.randomUUID(),courseId,seo.title||course.title,seo.description||course.shortDescription||null,
     seo.keywords?.[0]||null,JSON.stringify(seo.keywords||[]),
     `${process.env.APP_URL||'https://infinityaicloudacademy.com'}/courses/${course.slug}`,
     seo.title||course.title,seo.description||course.shortDescription||null,
     course.thumbnail||null,'index,follow']);
}
console.log(`Seeded ${courses.length} courses with curriculum, technologies and SEO.`);
await pool.end();
