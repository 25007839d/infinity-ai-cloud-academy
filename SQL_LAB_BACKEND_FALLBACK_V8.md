# SQL Lab Backend/Fallback V8

- Admin no longer needs a Lab Instructions field.
- SQL Practice Query is stored in `lesson_labs.config_json.starterSql`.
- For backward compatibility, if `starterSql` is empty and the legacy `lesson_labs.instructions` contains text, the API exposes that legacy value as `starterSql`.
- Saving the lesson writes the SQL query to `config_json.starterSql` and clears the legacy `instructions` field.
- The shared `GitHub / Drive Path (embedded)` field is URL-driven: GitHub blob/tree and Google Drive/Docs links are rendered inside the Academy.
- SQL Practice fallback order: SQL Practice Query -> GitHub/Drive shared path -> configured resource -> Dataset URL -> External URL.
- Colab remains the only intentional outbound/open-in-new-tab exception.
