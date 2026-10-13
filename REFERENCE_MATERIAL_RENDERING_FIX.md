# Reference Material Rendering Fix

## Root cause identified in the supplied code

- Lesson reference material is stored in `lesson_content` as a row with `content_type='EMBED'`, title `Google Drive PPT / PDF`, and the original URL in `content_url`. The lesson API maps that URL to `lesson.driveEmbedUrl`.
- `src/pages/student/LearningLesson.jsx` previously converted Google Slides URLs to `/preview?rm=minimal`. This is not the documented presentation embed endpoint and may show a Google Docs error for files that are not published or shared for the current viewer.
- The previous player only rendered an iframe. It did not give students a visible fallback to the original presentation when the embedded viewer failed. The admin editor stores a URL only; it does not currently accept PPT/PPTX file uploads, so there is no upload-conversion pipeline to modify.

## Changes

- Normalize Google Slides URLs to `/embed?start=false&loop=false` while preserving the original URL for the fallback link.
- Keep Google Drive file previews on `/file/d/{id}/preview`.
- Render direct PDF URLs in a responsive browser PDF frame. The browser's built-in PDF viewer provides page navigation and zoom where supported.
- Always show an `Open PDF`, `Open presentation`, or `Open material` link for valid configured URLs; show a clear message for unsupported URLs and direct PPT/PPTX files.
- Handle iframe `onError` and keep the fallback visible even when cross-origin Google viewer errors cannot be detected from the parent page.
- The existing authenticated lesson endpoint still requires student authentication and active course enrollment before it returns lesson records. No new public file-serving route was added, and no course/lesson rows were modified.

## Important limitations and secure rollout

- A parent page cannot reliably inspect Google Slides' cross-origin error page. The visible fallback is therefore always available instead of depending on unreliable iframe error detection.
- The admin form currently accepts a URL, not a PPT/PPTX upload. A safe upload conversion workflow needs an authenticated upload endpoint, file type/size validation, private storage, server-side conversion (for example, LibreOffice in an isolated worker), and a protected file-download endpoint that checks enrollment on every request. This patch does not pretend to provide that upload feature.
- Do not set paid course files to “Anyone with the link.” Google Drive sharing permissions remain controlled by Drive. For private course files, use private storage and an authenticated, enrollment-checked file endpoint before enabling direct PDF/PPT downloads.
- Direct PDF viewing uses the browser's native PDF viewer rather than PDF.js, so page/zoom controls depend on browser support. A bundled PDF.js viewer can be added as a follow-up if a uniform in-app toolbar is required.

## Validation

- Source review confirms the student lesson API uses `requireAuth('student')` and checks `getCourseAccess(...).status === 'ACTIVE'` before returning a lesson.
- Static UI paths were updated for Google Slides, Google Drive file preview, direct PDF, and direct PPT/PPTX fallback.
- Full production build could not be completed in this environment because the dependency installation timed out and `vite` was unavailable. Re-run `npm ci` and `npm run build` in the deployment environment before publishing.
- The live MySQL database and actual Google Drive file permissions were not available in this source bundle, so it is not possible to claim every production lesson URL was live-checked. Run the production lesson audit after deploying against the database.
