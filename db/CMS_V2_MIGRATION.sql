-- Infinity AI Cloud Academy CMS V2
-- Additive migration for admin Course/Post/Page/SEO management.

CREATE TABLE IF NOT EXISTS site_pages (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NULL,
  featured_image VARCHAR(500) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  author_name VARCHAR(150) NULL,
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pages_status (status),
  INDEX idx_pages_published (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_seo (
  id CHAR(36) NOT NULL PRIMARY KEY,
  page_id CHAR(36) NOT NULL UNIQUE,
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
  CONSTRAINT fk_page_seo_page FOREIGN KEY (page_id) REFERENCES site_pages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NULL,
  featured_image VARCHAR(500) NULL,
  category VARCHAR(150) NULL,
  tags TEXT NULL,
  author_name VARCHAR(150) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_posts_status (status),
  INDEX idx_posts_published (status, published_at),
  INDEX idx_posts_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS post_seo (
  id CHAR(36) NOT NULL PRIMARY KEY,
  post_id CHAR(36) NOT NULL UNIQUE,
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
  CONSTRAINT fk_post_seo_post FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_seo_settings (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_name VARCHAR(255) NULL,
  default_title VARCHAR(255) NULL,
  default_description TEXT NULL,
  default_keywords TEXT NULL,
  default_image VARCHAR(500) NULL,
  default_robots VARCHAR(100) NOT NULL DEFAULT 'index,follow',
  google_verification VARCHAR(255) NULL,
  bing_verification VARCHAR(255) NULL,
  analytics_id VARCHAR(255) NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_seo_settings (id, site_name, default_title, default_description, default_keywords, default_image, default_robots)
SELECT UUID(), 'Infinity AI Cloud Academy',
  'Infinity AI Cloud Academy | Data Engineering, Cloud & Generative AI Training',
  'Learn Data Engineering, Google Cloud Platform, Generative AI, Python, SQL, PySpark and build real-world industry projects with live online training.',
  'Data Engineering Course, Generative AI Course, Google Cloud Course, Python Course, SQL Course, PySpark Course, GCP Training, Cloud Computing, DevOps, AI Training',
  '/academy.png', 'index,follow'
WHERE NOT EXISTS (SELECT 1 FROM site_seo_settings);
