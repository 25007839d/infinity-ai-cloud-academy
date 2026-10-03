# CMS save preservation fix

The Course CMS previously deleted `course_modules` on every course save. Because lessons
belong to modules with cascading foreign keys, saving a lesson after adding/editing an
external Colab URL deleted the lesson's learning-experience records:
- lesson_visuals
- lesson_practice
- course_quizzes + quiz_questions
- course_assignments

V6 changes `replaceCourseChildren()` so existing module/lesson IDs are reused. It only
replaces editor-owned lesson content and labs. Visuals, practice, quizzes, questions,
assignments and student attempts remain attached when a lesson is edited.

No database migration is required for this backend fix.

Important: deploy the V6 `server.js` together with the existing frontend. If an older
server.js remains on Hostinger, the issue will continue.
