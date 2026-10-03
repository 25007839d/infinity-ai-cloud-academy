# Infinity AI Cloud Academy — Course Content

This directory is the code-managed content source for courses. The database remains the LMS source of truth for enrollment/progress, while this folder is the version-controlled authoring source.

## Add a course by code

Create `content/courses/<course-slug>/course.json` following the Data Engineering manifest and run:

```bash
npm run content:sync -- --course data-engineering
```

The sync script upserts the course and rebuilds its modules/lessons/content/labs from the manifest.

## Authoring workflow

- `.qmd` = Quarto presentation source
- `.html` = deployable presentation artifact
- `lessons/*/lesson.md` = lesson notes
- `lab/` = coding / architecture lab
- `assignments/` = graded work
- `practice/` = module practice
- `module.json` = mapping used by the LMS importer

UI-created courses continue to work through the existing Admin Course CMS. Code-managed courses use the same MySQL LMS tables.

## Quarto

Render presentations locally with Quarto when desired. The committed HTML files are fallback/static presentation artifacts for hosting environments that do not run Quarto during deployment.
