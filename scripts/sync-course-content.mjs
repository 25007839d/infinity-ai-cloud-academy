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

function conceptFamily(title='') {
  const t=String(title).toLowerCase();
  if (t.includes('window')) return {lab:'SQL', focus:'partitioning, ordering, window frames and analytical calculations'};
  if (t.includes('join')) return {lab:'SQL', focus:'keys, join cardinality, null behavior and relationship design'};
  if (t.includes('sql') || t.includes('query') || t.includes('cte') || t.includes('aggregation') || t.includes('group by') || t.includes('transaction') || t.includes('index') || t.includes('modeling') || t.includes('dimension')) return {lab:'SQL', focus:'SQL correctness, data modeling, query behavior and performance'};
  if (t.includes('pyspark') || t.includes('spark')) return {lab:'INTERNAL_PYSPARK', focus:'distributed processing, transformations, shuffles and scalable execution'};
  if (t.includes('python') || t.includes('pandas') || t.includes('numpy')) return {lab:'INTERNAL_PYTHON', focus:'Python implementation, testing, reusable functions and data processing'};
  if (t.includes('stream') || t.includes('beam') || t.includes('dataflow')) return {lab:'INTERNAL_PYTHON', focus:'event processing, windows, triggers, late data and reliable streaming'};
  if (t.includes('airflow') || t.includes('composer') || t.includes('dbt')) return {lab:'INTERNAL_PYTHON', focus:'orchestration, dependencies, retries, testing and production operations'};
  return {lab:'INTERNAL_PYTHON', focus:'production implementation, validation, failure handling and operational trade-offs'};
}

function starterSql(title='') {
  const t=String(title).toLowerCase();
  if(t.includes('window')) return `SELECT department_id, name, salary,\n       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank\nFROM employees;`;
  if(t.includes('join')) return `SELECT e.name, d.department_name, e.salary\nFROM employees e\nJOIN departments d ON d.id=e.department_id;`;
  if(t.includes('aggregation') || t.includes('group by')) return `SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id;`;
  if(t.includes('cte')) return `WITH dept_salary AS (\n  SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id\n)\nSELECT * FROM dept_salary;`;
  return `SELECT * FROM employees LIMIT 10;`;
}

function buildLearningAssets(title, moduleTitle) {
  const family=conceptFamily(title);
  const purpose=`Apply ${title} in a realistic ${moduleTitle} scenario and explain the engineering trade-offs.`;
  const practice=[
    `Explain ${title} in your own words and identify the problem it solves.`,
    `Create a small example for ${title} using realistic input data.`,
    `Add at least three validation checks for correctness or edge cases.`,
    `Describe what should happen when input is missing, duplicated or malformed.`,
    `Prepare a two-minute interview explanation covering scale, reliability and cost.`
  ];
  const questions=[
    {q:`Which approach best demonstrates a production-ready understanding of ${title}?`,o:[`A working example with inputs, outputs, validation and failure handling`,`Only memorizing syntax or definitions`,`Running one happy-path example without validation`,`Copying a code snippet without explaining it`],c:0,e:`Industry-ready implementation includes correctness, validation and operational behavior.`},
    {q:`When applying ${title}, which concern should be considered before production release?`,o:[`Correctness, scale, failure handling and observability`,`Only the UI color scheme`,`Only the number of lines of code`,`Only whether the first run succeeds`],c:0,e:`Production engineering requires correctness plus operational and scale considerations.`},
    {q:`What should you be able to explain in an interview about ${title}?`,o:[`Why it is used, how it works, trade-offs and failure modes`,`Only the command used to run it`,`Only a textbook definition`,`Only the library name`],c:0,e:`Strong engineering answers connect implementation details to business and operational trade-offs.`},
    {q:`What is a useful validation technique for ${title}?`,o:[`Test representative inputs, edge cases and expected outputs`,`Skip validation because production data is trusted`,`Validate only after a failure occurs`,`Check only that the process started`],c:0,e:`Validation should prove expected behavior before the solution is relied upon.`},
    {q:`What is the safest way to handle a retry while implementing ${title}?`,o:[`Make the operation deterministic/idempotent where possible and observe failures`,`Assume every retry is harmless`,`Create duplicate outputs intentionally`,`Disable logging to reduce noise`],c:0,e:`Safe retries depend on predictable effects, idempotency and observability.`}
  ];
  const assignment={
    title:`${title} — Industry Assignment`,
    instructions:`Build a small production-style implementation for ${title}. ${purpose} Submit the source/design, sample input and output, validation evidence, assumptions and failure-handling notes.`,
    tasks:[`Define the business problem and input/output contract.`,`Implement the core solution for ${title}.`,`Add validation and at least one negative/edge-case test.`,`Document retry, failure and observability behavior.`,`Record a short README explaining design choices and trade-offs.`]
  };
  return {family,purpose,practice,questions,assignment};
}

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
    await conn.query('DELETE FROM course_assignments WHERE course_id=?', [courseId]).catch(()=>{});
    await conn.query('DELETE FROM course_quizzes WHERE course_id=?', [courseId]).catch(()=>{});
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
        await conn.query('INSERT INTO lesson_labs (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order) VALUES (?,?,?,?,?,?,?,?,?)',[id(),lessonId,lab.labType,lab.title,lab.externalUrl||null,lab.instructions||null,lab.datasetUrl||null,JSON.stringify({...((lab.config&&typeof lab.config==='object')?lab.config:{}),...(lab.labType==='SQL'?{starterSql:starterSql(l.title)}:{})}),bi]);
      }

      // Learning Experience V2: one visual, practice set, quiz and assignment for every lesson.
      const assets=buildLearningAssets(l.title,m.title);
      const visualUrl=`/content/courses/data-engineering/visuals/${m.slug}/${l.slug}.svg`;
      await conn.query('INSERT INTO lesson_visuals (id,lesson_id,title,image_url,alt_text,caption,display_order) VALUES (?,?,?,?,?,?,?)',[id(),lessonId,`${l.title} — Concept Visual`,visualUrl,`${l.title} concept visual`,`Visual flow for ${l.title}. Use it to explain the concept before the hands-on exercise.`,0]).catch(()=>{});
      await conn.query('INSERT INTO lesson_practice (id,lesson_id,title,instructions,tasks_json,display_order,status) VALUES (?,?,?,?,?,?,?)',[id(),lessonId,`${l.title} — Practice`,assets.purpose,JSON.stringify(assets.practice),0,'published']).catch(()=>{});
      const quizId=id();
      await conn.query('INSERT INTO course_quizzes (id,course_id,lesson_id,title,passing_percent,status) VALUES (?,?,?,?,?,?)',[quizId,courseId,lessonId,`${l.title} — Concept Check`,70,'published']).catch(()=>{});
      for(let qi=0;qi<assets.questions.length;qi++) {
        const q=assets.questions[qi];
        await conn.query('INSERT INTO quiz_questions (id,quiz_id,question_text,options_json,correct_option,explanation,difficulty,display_order,status) VALUES (?,?,?,?,?,?,?,?,?)',[id(),quizId,q.q,JSON.stringify(q.o),q.c,q.e,qi===4?'HARD':qi>1?'MEDIUM':'EASY',qi,'published']).catch(()=>{});
      }
      await conn.query('INSERT INTO course_assignments (id,course_id,lesson_id,title,instructions,submission_type,status) VALUES (?,?,?,?,?,?,?)',[id(),courseId,lessonId,assets.assignment.title,`${assets.assignment.instructions}\n\nTasks:\n${assets.assignment.tasks.map((x,i)=>`${i+1}. ${x}`).join('\n')}`,'TEXT','published']).catch(()=>{});
      // Add a lab automatically when the manifest does not already define one.
      if(!(l.labs||[]).length) {
        const labType=assets.family.lab;
        const datasetUrl=labType==='SQL'?'/content/courses/data-engineering/shared/datasets/employees.csv':null;
        const instructions=`Hands-on ${l.title} lab. ${assets.purpose} Start with the provided example, implement the task, validate the result and document one failure scenario.`;
        await conn.query('INSERT INTO lesson_labs (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order) VALUES (?,?,?,?,?,?,?,?,?)',[id(),lessonId,labType,`${l.title} — Hands-on Lab`,null,instructions,datasetUrl,JSON.stringify({focus:assets.family.focus,...(labType==='SQL'?{starterSql:starterSql(l.title)}:{})}),0]).catch(()=>{});
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
