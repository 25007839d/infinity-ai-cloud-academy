# Strict LMS Redesign — Data Engineering

## Implemented

1. **Google Drive PPT/PDF embed**
   - Admin Course → Module → Lesson now has a dedicated `Google Drive PPT / PDF Embed` URL field.
   - Supports Google Drive file URLs and Google Slides URLs.
   - Student lesson renders the material inside the lesson.

2. **Lesson HTML cleanup**
   - Lesson HTML is sanitized server-side.
   - Repeated lesson-title headings, `Lesson Content`, and `Course Content` headings are removed.
   - Admin has a `Clean repeated headings` action before save.
   - Student HTML content is rendered without adding another duplicate lesson/content heading around it.

3. **TXT Assignment upload**
   - Admin can upload a `.txt` file from the lesson Assignment section.
   - Browser reads the text and saves it as assignment instructions.
   - Assignment remains at the end of the learning experience after MCQ.

4. **Topic-wise MCQs**
   - `DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql` now creates exactly **5 MCQs per lesson** for all 182 mapped lessons = **910 MCQs**.
   - Each quiz is attached to its lesson/topic and published with a 70% pass mark.

5. **Lab links preserved**
   - Existing SQL / Colab / GitHub / Text Code lab fields remain in the CMS.
   - Run `db/STRICT_LMS_REDESIGN_MIGRATION.sql` to add `GITHUB_CODE` and `TEXT_CODE` to the MySQL `lesson_labs.lab_type` enum if your existing database does not already have them.

## Deployment

Run the existing LMS/CMS migrations first, then:

```sql
SOURCE db/STRICT_LMS_REDESIGN_MIGRATION.sql;
SOURCE db/DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql;
```

The new syllabus seed contains the 18-module / 182-lesson curriculum and 910 topic-wise MCQs.

## Notes

- No separate file-storage service is required for TXT assignments; the text is stored in the existing assignment `instructions` field.
- Google Drive files must be shared so enrolled students can view them. The LMS cannot bypass Google Drive permissions.
- Drive/PPT/PDF embedding uses the original source link; it does not download or duplicate the source file.
