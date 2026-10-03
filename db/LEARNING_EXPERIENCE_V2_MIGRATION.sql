-- Infinity AI Cloud Academy - Learning Experience V2
-- Adds per-lesson practice, quizzes, assignments, visual explanations and submissions.

CREATE TABLE IF NOT EXISTS lesson_visuals (
  id CHAR(36) NOT NULL PRIMARY KEY,
  lesson_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  alt_text VARCHAR(500) NULL,
  caption TEXT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lesson_visual_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE,
  INDEX idx_lesson_visual_order (lesson_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lesson_practice (
  id CHAR(36) NOT NULL PRIMARY KEY,
  lesson_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  instructions TEXT NULL,
  tasks_json JSON NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lesson_practice (lesson_id),
  CONSTRAINT fk_lesson_practice_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quiz_questions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  quiz_id CHAR(36) NOT NULL,
  question_text TEXT NOT NULL,
  options_json JSON NOT NULL,
  correct_option TINYINT UNSIGNED NOT NULL,
  explanation TEXT NULL,
  difficulty ENUM('EASY','MEDIUM','HARD') NOT NULL DEFAULT 'MEDIUM',
  display_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_quiz_question_quiz FOREIGN KEY (quiz_id) REFERENCES course_quizzes(id) ON DELETE CASCADE,
  INDEX idx_quiz_question_order (quiz_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  quiz_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  score_percent TINYINT UNSIGNED NOT NULL,
  passed TINYINT(1) NOT NULL DEFAULT 0,
  answers_json JSON NULL,
  attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_quiz_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES course_quizzes(id) ON DELETE CASCADE,
  CONSTRAINT fk_quiz_attempt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_quiz_attempt_user (user_id, quiz_id, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assignment_submissions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  assignment_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  submission_type ENUM('TEXT','LINK','FILE','CODE') NOT NULL DEFAULT 'TEXT',
  submission_text MEDIUMTEXT NULL,
  file_url VARCHAR(1000) NULL,
  status ENUM('SUBMITTED','REVIEWED','RETURNED') NOT NULL DEFAULT 'SUBMITTED',
  trainer_feedback TEXT NULL,
  score DECIMAL(5,2) NULL,
  submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignment_submission_assignment FOREIGN KEY (assignment_id) REFERENCES course_assignments(id) ON DELETE CASCADE,
  CONSTRAINT fk_assignment_submission_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_assignment_submission_user (user_id, assignment_id, submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
