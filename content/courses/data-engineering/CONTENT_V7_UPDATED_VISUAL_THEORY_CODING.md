# Data Engineering Content — Updated from Attached V7

This package is based directly on the attached deployed-content ZIP supplied by the user.

## Updated scope

- 142/142 lessons updated.
- 142/142 topic visuals refreshed as teaching diagrams, not decorative banners.
- OLTP vs OLAP now uses a true side-by-side comparison:
  - OLTP = Run the Business
  - OLAP = Analyze the Business
  - transaction examples and analytical examples
- Every lesson includes **Concept at a Glance**.
- Every lesson includes **Coding Syntax to Memorize** inside the lesson theory.
- Coding syntax is selected by topic where possible: SQL, Python, PySpark, Beam/Dataflow, BigQuery, Airflow, dbt, Terraform, Docker, Git, security, observability, system design, interviews, etc.
- `course.json` visual URLs were corrected to point to the actual numbered visual assets.
- Existing labs, assignments, practice and quiz content are preserved.

## Student learning pattern

SEE → UNDERSTAND → MEMORIZE → CODE → PRACTICE → EXPLAIN

## Deployment

Replace/sync the `content/` directory from this package into the deployed application and run the normal content preparation/build process used by the Academy.

This package does not change database records or the backend CMS code.
