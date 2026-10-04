# Lab Backend Query + Resource Tabs

## Student SQL Lab
- The SQL editor no longer contains a hard-coded fallback query.
- The initial SQL is loaded from `lesson_labs.config_json.starterSql` (with `codeText` as a compatibility fallback).
- Lab `instructions` are rendered above the editor so admin-authored instructions are visible.
- Multiple statements remain supported; students can run all configured statements or only selected text.

## Admin CMS
For each lesson's Lab:
- **Lab Instructions**: student-facing task text.
- **Starter / Practice SQL** (SQL labs): multi-statement SQL stored in `config_json.starterSql`.
- **Lab Resource Tabs**: add GitHub, Drive, Colab or generic URL resources.
  - Type
  - Tab Title
  - URL
  - Optional Description

## Student Resource Tabs
- The first tab is `SQL Practice`.
- Additional resource tabs come from `config_json.resources`.
- Drive resources are previewed inside the lab when a Google Drive file or Slides URL can be converted to a preview/embed URL.
- GitHub, Colab and generic resources expose an Open button.

## Database
No new table or migration is required. The existing `lesson_labs.config_json` field stores the SQL and resource-tab configuration.
