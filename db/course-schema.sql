-- Infinity AI Cloud Academy - Course CMS + SEO extension
-- Safe additive migration. Does not alter existing tables.

CREATE TABLE IF NOT EXISTS courses (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  tagline VARCHAR(500) NULL,
  short_description TEXT NULL,
  overview TEXT NULL,
  thumbnail VARCHAR(500) NULL,
  banner VARCHAR(500) NULL,
  category VARCHAR(150) NULL,
  duration VARCHAR(100) NULL,
  level VARCHAR(100) NULL,
  mode VARCHAR(100) NULL,
  language VARCHAR(100) NULL,
  certificate_available TINYINT(1) NOT NULL DEFAULT 0,
  certificate_title VARCHAR(255) NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  students VARCHAR(100) NULL,
  rating DECIMAL(3,2) NULL,
  projects INT NOT NULL DEFAULT 0,
  modules_count INT NOT NULL DEFAULT 0,
  icon VARCHAR(100) NULL,
  theme_color VARCHAR(100) NULL,
  display_order INT NOT NULL DEFAULT 0,
  coming_soon TINYINT(1) NOT NULL DEFAULT 0,
  popular TINYINT(1) NOT NULL DEFAULT 0,
  enrollment_open TINYINT(1) NOT NULL DEFAULT 1,
  last_updated DATE NULL,
  version VARCHAR(50) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_courses_status_order (status, display_order),
  INDEX idx_courses_featured (featured),
  INDEX idx_courses_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_technologies (
  id CHAR(36) NOT NULL PRIMARY KEY,
  course_id CHAR(36) NOT NULL,
  technology VARCHAR(150) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_course_technology_course
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course_technology_course (course_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_modules (
  id CHAR(36) NOT NULL PRIMARY KEY,
  course_id CHAR(36) NOT NULL,
  module_name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  display_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_course_module_course
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course_module_course (course_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_module_topics (
  id CHAR(36) NOT NULL PRIMARY KEY,
  module_id CHAR(36) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_course_topic_module
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE,
  INDEX idx_course_topic_module (module_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_seo (
  id CHAR(36) NOT NULL PRIMARY KEY,
  course_id CHAR(36) NOT NULL UNIQUE,
  meta_title VARCHAR(255) NULL,
  meta_description TEXT NULL,
  focus_keyword VARCHAR(255) NULL,
  keywords TEXT NULL,
  canonical_url VARCHAR(500) NULL,
  og_title VARCHAR(255) NULL,
  og_description TEXT NULL,
  og_image VARCHAR(500) NULL,
  robots VARCHAR(100) NOT NULL DEFAULT 'index,follow',
  schema_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_course_seo_course
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
