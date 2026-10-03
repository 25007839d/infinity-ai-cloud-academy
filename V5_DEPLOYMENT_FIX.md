# V5 deployment fix

The V5 package fixes two separate issues:

1. The 142 concept visual DB URLs now point to the actual numbered SVG files packaged under `public/content/.../visuals`.
2. The Learning Experience React component no longer silently hides API errors. If practice/quiz/assignment data cannot load, the page shows the actual API error.

### Database
In `u776794897_infinity_ai`:
- If Learning Experience tables are missing, run `LEARNING_EXPERIENCE_AND_DATA_ENGINEERING_INSTALL.sql`.
- If tables/data already exist, run `FIX_LEARNING_EXPERIENCE_VISUAL_PATHS.sql`.

### Hostinger
Deploy/restart the Node.js backend too. `app.js` imports `server.js`, which contains `/api/learn/courses/:slug/lessons/:lessonSlug/experience`.
