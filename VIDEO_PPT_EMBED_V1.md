# Video + PPT/PDF Embed V1

Lesson reference order is now:

1. What You’ll Learn
2. Video (YouTube or Google Drive)
3. Google Drive PPT/PDF
4. Custom Material
5. Hands-on Lab
6. Test
7. Assignment

## Admin
Each lesson has a dedicated Video Embed block with:
- Source: YouTube or Google Drive
- Video URL

PPT/PDF remains a separate Google Drive Embed field.

## Storage
No schema change is required. Both resources are stored in `lesson_content`:
- Video: `content_type='VIDEO'`, `title='Course Video'`; `content_html` stores `YOUTUBE` or `GOOGLE_DRIVE`.
- PPT/PDF: `content_type='EMBED'`, `title='Google Drive PPT / PDF'`.

This keeps the feature backward compatible with the current MySQL schema.
