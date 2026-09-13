# Course CMS + SEO v1

This update keeps the existing course URLs and existing APIs intact.

## What changed

- Added MySQL-backed `courses`, `course_technologies`, `course_modules`, `course_module_topics`, and `course_seo` tables.
- Added public APIs:
  - `GET /api/courses`
  - `GET /api/courses/:slug`
- Course listing and course detail pages now read from the API first.
- Existing `src/data/courses.js` remains as a safety fallback until the database migration is completed.
- Course detail SEO uses DB SEO fields and includes Course + Breadcrumb structured data.
- Express server renders course SEO metadata into the initial HTML for `/courses/:slug`.
- `/sitemap.xml` becomes DB-aware and automatically includes published course URLs.
- Existing auth, admin, demo registration, contact, and student APIs were not changed.

## One-time database migration

In phpMyAdmin, select the existing Academy database and import:

`db/COURSE_CMS_MIGRATION.sql`

This creates the new tables and imports the existing six courses with technologies, curriculum, and SEO metadata.

## Deployment

No new environment variables are required.

Build command remains:

`npm run build`

Start command remains:

`npm start`

Entry file remains:

`app.js`

After deployment, verify:

- `/health`
- `/api/health`
- `/api/courses`
- `/api/courses/data-engineering`
- `/courses/data-engineering`
- `/sitemap.xml`
- `/admin/login`
- `/book-demo`

Do not delete `src/data/courses.js` yet. It is intentionally retained as a fallback during migration.
