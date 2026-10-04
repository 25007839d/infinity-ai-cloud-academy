-- Strict LMS redesign migration
-- 1) Preserve existing lab behavior and add GitHub/Text Code lab types.
ALTER TABLE lesson_labs
  MODIFY COLUMN lab_type ENUM('SQL','COLAB_PYTHON','COLAB_PYSPARK','GITHUB_CODE','TEXT_CODE','INTERNAL_PYTHON','INTERNAL_PYSPARK') NOT NULL;

-- 2) No new table is required for Drive PPT/PDF embeds.
-- They are stored as lesson_content.content_type='EMBED'
-- with title='Google Drive PPT / PDF' and content_url=<Drive/Slides URL>.

-- 3) Admin TXT assignment uploads are stored as course_assignments.instructions.
-- The browser reads the .txt file and sends its text to the existing CMS API.
