-- Strict lesson content cleanup v2
-- Adds an admin-editable What You'll Learn block separate from lesson HTML.
ALTER TABLE course_lessons
  ADD COLUMN IF NOT EXISTS what_you_learn_html MEDIUMTEXT NULL AFTER description;

-- Existing lesson HTML is cleaned when the CMS saves the course.
-- This migration intentionally does not overwrite existing lesson content.
