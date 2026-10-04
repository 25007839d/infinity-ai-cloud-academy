# Strict Lesson Content Order v2

Student lesson order is now:

1. Lesson title / description
2. What You'll Learn — separate admin-controlled HTML field
3. Video — YouTube or Google Drive (admin-controlled)
4. Reference Material — Google Drive PPT/PDF embed (admin-controlled)
5. Custom Material — actual lesson HTML only
6. Hands-on Lab — existing SQL / Colab / GitHub / Text Code flow
7. Topic Test — 5 MCQs
8. Assignment
9. Lesson progress / completion

Generated boilerplate removed from lesson HTML:
- Source / original source links
- Module line
- Infinity AI Cloud Academy intro paragraph
- What you will learn
- Industry perspective
- Hands-on objective
- Interview checkpoint
- Duplicate lesson title H1

Deployment:

```sql
SOURCE db/STRICT_LMS_REDESIGN_MIGRATION.sql;
SOURCE db/DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql;
```

The seed now also contains the one-time `what_you_learn_html` migration updates for the 182 Data Engineering lessons.

If the database already contains the Data Engineering course, run the migration first and then the seed/update statements. Existing lab records are preserved by the CMS design.
