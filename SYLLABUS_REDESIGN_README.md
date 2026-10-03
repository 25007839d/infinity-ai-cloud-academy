# Data Engineering Syllabus Redesign

This update is based on the `New_syllabus` worksheet from the supplied workbook.

## What changed

- Reorganized the Data Engineering course into 18 mapped modules.
- Preserved PPT/slide and code source links from the workbook.
- Added `scripts/import_syllabus.py` to download public GitHub material and convert PDF slide decks into deployable HTML with rendered slide images.
- Added Academy-authored fallback HTML for syllabus items without source material.
- Added Code Lab types:
  - GitHub Code
  - Editable Text Code
  - Colab Python
  - Colab PySpark
  - SQL
  - Internal Python/PySpark
- Added GitHub path support in the admin Course CMS.
- Added editable starter-code text support in the admin Course CMS.
- SQL Lab now supports multiple read-only statements in one editor.
- Selecting a portion of the SQL editor and pressing Run executes only the selected SQL.
- SQL Lab returns separate result sets for multiple queries.
- Existing Course → Module → Lesson → Content/Lab LMS architecture is retained.

## Import the workbook

From the project root:

```bash
python scripts/import_syllabus.py --xlsx "Data Engineer - Jun-2025.xlsx"
```

For environments without internet access, preserve source URLs and generate fallback HTML:

```bash
python scripts/import_syllabus.py --xlsx "Data Engineer - Jun-2025.xlsx" --no-download
```

The importer creates:

- `public/generated-syllabus/manifest.json`
- `public/generated-syllabus/materials/...`
- `db/DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql`

When network access is available, public GitHub PDF/code sources are downloaded. PDF slide decks are converted to HTML and page images. Google Drive folder links are retained as source links because folder contents require access to the source account.

## Database

Apply:

1. Existing CMS/LMS migrations.
2. `db/DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql`

The generated seed replaces the Data Engineering course curriculum with the 18-module syllabus map.

## SQL Lab

The SQL lab remains read-only. It accepts up to 25 statements per run and supports:

```sql
SELECT * FROM employees LIMIT 10;

SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
```

A selected portion of the editor can be executed independently.

## Deployment note

Do not commit `.env` or production secrets. Configure database/API variables in Hostinger's environment configuration.
