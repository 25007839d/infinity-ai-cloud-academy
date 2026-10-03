# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Hostinger deployment

This application is now designed as a full-stack Node.js application for Hostinger:

- React/Vite frontend
- Express API served from the same domain under `/api/*`
- Hostinger MySQL database
- HttpOnly JWT authentication
- Admin CRM APIs for demo registrations

See `HOSTINGER_MYSQL_MIGRATION.md` for the database and hPanel setup.


## Course content architecture

Course authoring is version-controlled under `content/courses/<course-slug>/`. Every course can still be created/edited from the Admin Course CMS. For code-managed courses, add/update `course.json` and run `npm run content:sync -- --course <slug>`. Quarto `.qmd` files are the presentation source; committed `.html` files are static deployable artifacts.

### Data Engineering content

The repository now includes a 19-module Data Engineering program with module presentations, lesson notes, coding/architecture labs, assignments, 20-question practice sets and shared datasets. Uploaded teaching resources were used as reference material for Python, Apache Beam/Dataflow and Dataproc/PySpark coverage.

## Learning Experience V2

Every published lesson can now expose the full learning loop:

1. Concept visual / diagram
2. Practice tasks
3. Concept-check quiz with multiple-choice options and explanations
4. Hands-on lab (SQL uses the isolated SQL Lab database; Python/PySpark labs use the course starter assets)
5. Industry assignment with student submission
6. Lesson progress

Run `db/LEARNING_EXPERIENCE_V2_MIGRATION.sql` once in the Academy database after `LMS_V1_MIGRATION.sql`. Then run `npm run content:sync -- --course data-engineering` to populate the 142-lesson learning experience. The SQL Lab database remains separate and is seeded with `db/SQL_LAB_SEED.sql`.

Visual assets are code-managed under `content/courses/data-engineering/visuals/` and are copied into the deployable `/public/content/courses/` tree during build preparation.
