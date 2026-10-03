-- Infinity AI Cloud Academy - LMS V1
-- Additive migration. Run once after COURSE_CMS_MIGRATION.sql.

ALTER TABLE courses
  ADD COLUMN access_type ENUM('free','paid','invite') NOT NULL DEFAULT 'free',
  ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN currency VARCHAR(10) NOT NULL DEFAULT 'INR';

CREATE TABLE IF NOT EXISTS course_lessons (
  id CHAR(36) NOT NULL PRIMARY KEY,
  module_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT NULL,
  lesson_type ENUM('THEORY','SLIDES','VIDEO','SQL','PYTHON','PYSPARK','QUIZ','ASSIGNMENT','PROJECT','LIVE','RESOURCE') NOT NULL DEFAULT 'THEORY',
  duration_minutes INT NOT NULL DEFAULT 0,
  is_preview TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lesson_module_slug (module_id, slug),
  INDEX idx_lessons_module_order (module_id, display_order),
  CONSTRAINT fk_lesson_module FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lesson_content (
  id CHAR(36) NOT NULL PRIMARY KEY,
  lesson_id CHAR(36) NOT NULL,
  content_type ENUM('SLIDES','VIDEO','NOTES','ARTICLE','PDF','EMBED') NOT NULL,
  title VARCHAR(255) NULL,
  content_url VARCHAR(1000) NULL,
  content_html MEDIUMTEXT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lesson_content_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE,
  INDEX idx_lesson_content_order (lesson_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lesson_labs (
  id CHAR(36) NOT NULL PRIMARY KEY,
  lesson_id CHAR(36) NOT NULL,
  lab_type ENUM('SQL','COLAB_PYTHON','COLAB_PYSPARK','INTERNAL_PYTHON','INTERNAL_PYSPARK') NOT NULL,
  title VARCHAR(255) NOT NULL,
  external_url VARCHAR(1000) NULL,
  instructions TEXT NULL,
  dataset_url VARCHAR(1000) NULL,
  config_json JSON NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lesson_lab_type (lesson_id, lab_type),
  CONSTRAINT fk_lesson_lab_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE,
  INDEX idx_lesson_lab_lesson (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lesson_resources (
  id CHAR(36) NOT NULL PRIMARY KEY,
  lesson_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  resource_type VARCHAR(50) NOT NULL DEFAULT 'LINK',
  resource_url VARCHAR(1000) NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lesson_resource_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE,
  INDEX idx_lesson_resources_order (lesson_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_enrollments (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  course_id CHAR(36) NOT NULL,
  status ENUM('PENDING','ACTIVE','EXPIRED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'ACTIVE',
  access_type ENUM('FREE','PAID','ADMIN','INVITE') NOT NULL DEFAULT 'FREE',
  payment_id VARCHAR(255) NULL,
  start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_course_enrollment (user_id, course_id),
  CONSTRAINT fk_enrollment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_enrollment_user_status (user_id, status),
  INDEX idx_enrollment_course_status (course_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lesson_progress (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  lesson_id CHAR(36) NOT NULL,
  status ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED') NOT NULL DEFAULT 'NOT_STARTED',
  progress_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
  started_at DATETIME NULL,
  completed_at DATETIME NULL,
  last_accessed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_lesson_progress (user_id, lesson_id),
  CONSTRAINT fk_lesson_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_lesson_progress_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE,
  INDEX idx_progress_user (user_id, updated_at),
  INDEX idx_progress_lesson (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_quizzes (
  id CHAR(36) NOT NULL PRIMARY KEY,
  course_id CHAR(36) NOT NULL,
  lesson_id CHAR(36) NULL,
  title VARCHAR(255) NOT NULL,
  passing_percent TINYINT UNSIGNED NOT NULL DEFAULT 60,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_quiz_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  CONSTRAINT fk_quiz_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_assignments (
  id CHAR(36) NOT NULL PRIMARY KEY,
  course_id CHAR(36) NOT NULL,
  lesson_id CHAR(36) NULL,
  title VARCHAR(255) NOT NULL,
  instructions TEXT NULL,
  submission_type ENUM('TEXT','LINK','FILE','CODE') NOT NULL DEFAULT 'TEXT',
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  CONSTRAINT fk_assignment_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Convert the existing topic-based curriculum into real lessons once.
INSERT INTO course_lessons (id, module_id, title, slug, description, lesson_type, display_order)
SELECT UUID(), t.module_id, t.topic,
       CONCAT('topic-', REPLACE(t.id, '-', '')),
       NULL,
       CASE
         WHEN LOWER(t.topic) LIKE '%sql%' OR LOWER(t.topic) LIKE '%query%' OR LOWER(t.topic) LIKE '%join%' THEN 'SQL'
         WHEN LOWER(t.topic) LIKE '%python%' THEN 'PYTHON'
         WHEN LOWER(t.topic) LIKE '%pyspark%' OR LOWER(t.topic) LIKE '%spark%' THEN 'PYSPARK'
         ELSE 'THEORY'
       END,
       t.display_order
FROM course_module_topics t
LEFT JOIN course_lessons l ON l.module_id = t.module_id AND l.title = t.topic
WHERE l.id IS NULL;
