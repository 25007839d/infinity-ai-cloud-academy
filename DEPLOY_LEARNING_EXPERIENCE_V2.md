# Learning Experience V2 — Deployment

This update fixes the lesson experience so a student gets more than a Notes iframe.

## What is added

Every Data Engineering lesson can show:

- Concept visual / diagram
- Practice tasks
- 5-question MCQ concept check with options and explanations
- Hands-on lab
- Industry assignment + text/link/code submission
- Existing lesson progress

## 1. Academy database

Run these in `u776794897_infinity_ai` in this order if not already applied:

1. `COURSE_CMS_MIGRATION.sql`
2. `LMS_V1_MIGRATION.sql`
3. `LEARNING_EXPERIENCE_V2_MIGRATION.sql`
4. `DATA_ENGINEERING_COURSE_SEED_V2.sql`

`DATA_ENGINEERING_COURSE_SEED_V2.sql` resolves the existing `data-engineering` course ID by slug, so it does not depend on the old hard-coded course UUID.

## 2. SQL Lab database

Keep the SQL practice database separate from the Academy DB.

Run `SQL_LAB_SEED.sql` inside `u776794897_infinity_lab` using the dedicated SQL Lab user.

Hostinger environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=u776794897_academy_user
DB_PASSWORD=<academy-password>
DB_NAME=u776794897_infinity_ai

SQL_LAB_DATABASE=u776794897_infinity_lab
SQL_LAB_USER=u776794897_user_infinity
SQL_LAB_PASSWORD=<lab-password>
SQL_LAB_CONNECTION_LIMIT=5
```

## 3. Code sync option

Instead of importing the large course seed, after the migrations run:

```bash
npm run content:sync -- --course data-engineering
```

The sync script recreates the course curriculum and automatically creates the learning-experience records for each lesson.

## 4. Build

```bash
npm install
npm run build
```

The SVG concept visuals live under:

`content/courses/data-engineering/visuals/`

and are copied into the deployable public content tree by `content:prepare` during the build.

## 5. Expected lesson page

A lesson should now appear in this order:

1. Notes / presentation
2. Concept Visual
3. Hands-on Lab
4. Practice
5. Concept Check
6. Industry Assignment
7. Complete Lesson / Progress

## Visual + Mermaid deployment fix
The course content is prepared into `public/content/courses` during `npm run build`. This includes all lesson HTML and concept SVG files. Lesson HTML now converts Mermaid code blocks into rendered SVG diagrams using Mermaid's browser ESM runtime. Do not deploy only the database seed; run the normal Hostinger build so `dist/content/courses` is populated.
