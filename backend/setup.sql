-- Veritabanını oluşturun
CREATE DATABASE IF NOT EXISTS `turizm_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `turizm_db`;

-- Ayarlar tablosu
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Başlangıç ayarları
INSERT INTO `settings` (`key`, `value`) VALUES
('contact_phone', '0538 497 61 07'),
('contact_whatsapp', '905384976107'),
('contact_email', 'info@asrholiday.com'),
('contact_address', 'Antalya, Türkiye'),
('site_logo', '');

-- Diller tablosu
CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_rtl` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Varsayılan diller
INSERT INTO `languages` (`code`, `name`, `is_rtl`, `is_active`) VALUES
('TR', 'Türkçe', 0, 1),
('EN', 'English', 0, 1),
('RU', 'Russian', 0, 1),
('DE', 'German', 0, 1),
('AR', 'Arabic', 1, 1),
('ES', 'Spanish', 0, 1);

-- Çeviriler tablosu
CREATE TABLE IF NOT EXISTS `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang_code` varchar(5) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lang_key` (`lang_code`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Turlar tablosu
CREATE TABLE IF NOT EXISTS `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) DEFAULT 0.00,
  `quota` int(11) DEFAULT 0,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tur Çevirileri tablosu
CREATE TABLE IF NOT EXISTS `tour_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `lang_code` varchar(5) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `special_conditions` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tour_id` (`tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tur Resimleri tablosu
CREATE TABLE IF NOT EXISTS `tour_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `is_main` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `tour_id` (`tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
