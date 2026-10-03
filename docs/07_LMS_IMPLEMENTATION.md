# Infinity AI Cloud Academy — LMS V1 Implementation

## Locked learning hierarchy

Course → Module → Lesson → Content/Lab → Assessment → Progress

## Course access

- Anyone can create a student account.
- Creating an account does not automatically unlock every course.
- Free course: student login + enrollment immediately activates access.
- Paid course: payment is required; until a payment gateway is connected, an admin can manually enroll the student.
- Invite course: admin enrollment only.
- Public course pages remain visible for discovery and SEO.
- Learning routes require an authenticated student with an ACTIVE enrollment.

## Lesson content

A lesson can contain:

- Quarto/RevealJS HTML slides
- Video
- Notes/PDF
- Article/HTML
- Embed
- SQL Lab
- Python Colab
- PySpark Colab

## Labs

- SQL: internal Academy SQL Lab, connected to a separate read-only practice database.
- Python: initially external Google Colab link.
- PySpark: initially external Google Colab link.
- Future internal Python/PySpark runners can be added without changing the lesson model.

## Database migration

Run in this order:

1. Existing schema/course CMS migrations.
2. `db/LMS_V1_MIGRATION.sql`.
3. Optional `db/SQL_LAB_SEED.sql` in a separate MySQL database.
4. Set `SQL_LAB_DATABASE` in the Node.js environment.
5. `npm run seed:courses` if existing course seed data should be refreshed.

## Important security rule

Never point `SQL_LAB_DATABASE` at the production Academy database. The V1 SQL runner accepts only a single read-only SELECT/CTE/SHOW/DESCRIBE/EXPLAIN statement and has rate limiting. Use a separate practice database.

## Admin workflow

Admin → Courses → New/Edit Course → Course Details → Curriculum → Module → Lesson → Content/Lab.

The existing public course CMS remains compatible with the old topic curriculum while new lessons are stored in `course_lessons`.

## Student workflow

Create Account → Login → Course Page → Enroll → Student Dashboard → Course Player → Lesson → Slides/Lab → Complete Lesson → Progress.


### SQL Lab database isolation

The SQL Lab uses a dedicated MySQL connection. Configure `SQL_LAB_DATABASE`, `SQL_LAB_USER` and `SQL_LAB_PASSWORD`. Do not change `DB_NAME`: the main Academy connection must continue pointing to the LMS database.
