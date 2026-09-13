-- Infinity AI Cloud Academy - Hostinger MySQL schema
-- Create the database itself in hPanel. Run this file inside that database.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS admins (
  id CHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role ENUM('admin','super_admin','counsellor','trainer') NOT NULL DEFAULT 'admin',
  status ENUM('Active','Disabled') NOT NULL DEFAULT 'Active',
  last_login DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admin_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role ENUM('student','lead','trainer','counsellor','admin','super_admin') NOT NULL DEFAULT 'student',
  status ENUM('Active','Disabled') NOT NULL DEFAULT 'Active',
  last_login DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role),
  INDEX idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS demo_registrations (
  id CHAR(36) NOT NULL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  course VARCHAR(150) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  status ENUM('New','Contacted','Demo Scheduled','Follow Up','Joined','Not Interested') NOT NULL DEFAULT 'New',
  notes TEXT NULL,
  follow_up_date DATE NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_demo_email (email),
  INDEX idx_demo_phone (phone),
  INDEX idx_demo_status (status),
  INDEX idx_demo_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NULL,
  course VARCHAR(150) NULL,
  message TEXT NOT NULL,
  status ENUM('New','Read','Replied','Closed') NOT NULL DEFAULT 'New',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_email (email),
  INDEX idx_contact_status (status),
  INDEX idx_contact_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_reset_user (user_id),
  INDEX idx_reset_expiry (expires_at),
  CONSTRAINT fk_reset_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



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


CREATE TABLE IF NOT EXISTS user_course_views (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  course_id CHAR(36) NOT NULL,
  view_count INT NOT NULL DEFAULT 1,
  first_viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_viewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_course_view (user_id, course_id),
  CONSTRAINT fk_user_course_view_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_course_view_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_user_course_views_user (user_id, last_viewed_at),
  INDEX idx_user_course_views_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
