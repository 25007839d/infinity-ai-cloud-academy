# Infinity AI Cloud Academy LMS V1 — Setup

## 1. Install

```bash
npm install
```

## 2. Database

Run your existing Academy database/CMS migrations first, then:

```text
db/LMS_V1_MIGRATION.sql
```

This adds:

- Course access type + price
- Course lessons
- Lesson content
- Lesson labs
- Lesson resources
- Enrollments
- Lesson progress
- Quiz/assignment base tables

The migration also converts existing `course_module_topics` into real lessons.

## 3. SQL Lab

Create a **separate MySQL database** for student practice and run:

```text
db/SQL_LAB_SEED.sql
```

Then configure:

```env
SQL_LAB_DATABASE=infinity_sql_lab
SQL_LAB_USER=infinity_lab_user
SQL_LAB_PASSWORD=change-me
```

Do not point this variable at the production Academy database.

## 4. Course creation

Admin → Courses → New Course.

Hierarchy:

```text
Course
  └── Module
       └── Lesson
            ├── Content
            │    ├── Quarto HTML
            │    ├── Video
            │    └── Notes
            └── Lab
                 ├── SQL
                 ├── Colab Python
                 └── Colab PySpark
```

## 5. Access rules

- Student account: can register/login.
- Free course: enrolled after clicking `Enroll & Start Learning`.
- Paid course: payment is required; until a gateway is connected, admin can manually enroll the student.
- Invite course: admin enrollment only.
- Learning routes require active enrollment.
- Preview lessons can be opened publicly from the public course page.

## 6. Quarto

Render your `.qmd` files to HTML and store the public HTML URL in the lesson's Content section as `SLIDES`.

Example:

```text
https://infinityaicloudacademy.com/lessons/data-engineering/01-introduction.html
```

## 7. Python / PySpark

Create notebooks in GitHub and add their Google Colab URL to a lesson lab:

```text
COLAB_PYTHON
COLAB_PYSPARK
```

The platform opens these notebooks in Colab. No Python/Spark server is required for V1.

## 8. Production build

```bash
npm run build
npm start
```

Before production deployment, set all `.env` values in Hostinger Environment Variables. Never upload `.env` or `.git` from a local project archive.


### SQL Lab database isolation

The SQL Lab uses a dedicated MySQL connection. Configure `SQL_LAB_DATABASE`, `SQL_LAB_USER` and `SQL_LAB_PASSWORD`. Do not change `DB_NAME`: the main Academy connection must continue pointing to the LMS database.
