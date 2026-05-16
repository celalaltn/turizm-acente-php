-- Sürüm: 1.0.0
-- Turizm Acentası Veritabanı Şeması
-- Karakter Seti: UTF-8 (utf8mb4)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+03:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Tablo: `languages`
-- Sitedeki desteklenen dilleri yönetmek için
--
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL COMMENT 'Dil kodu (Örn: TR, EN, AR)',
  `name` varchar(50) NOT NULL COMMENT 'Dil adı (Örn: Türkçe, English)',
  `is_rtl` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 ise Sağdan Sola (Arapça vb.)',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 ise sitede aktif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Başlangıç Dilleri
INSERT INTO `languages` (`code`, `name`, `is_rtl`, `is_active`) VALUES
('TR', 'Türkçe', 0, 1),
('EN', 'English', 0, 1),
('RU', 'Русский', 0, 1),
('DE', 'Deutsch', 0, 1),
('AR', 'العربية', 1, 1),
('ES', 'Español', 0, 1);

-- --------------------------------------------------------

--
-- Tablo: `settings`
-- Firmanın iletişim bilgileri gibi tek tip verileri için
--
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Başlangıç Ayarları
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('contact_phone', '+90 555 123 4567'),
('contact_whatsapp', '+90 555 123 4567'),
('contact_email', 'info@turizmacenta.com'),
('admin_email', 'admin@turizmacenta.com');

-- --------------------------------------------------------

--
-- Tablo: `translations`
-- Sitedeki statik metinlerin (Örn: Anasayfa butonu) farklı dillerdeki karşılıkları için
--
CREATE TABLE `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang_code` varchar(10) NOT NULL,
  `translation_key` varchar(100) NOT NULL COMMENT 'Örn: nav.home',
  `translation_value` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lang_key_unique` (`lang_code`, `translation_key`),
  KEY `lang_code` (`lang_code`),
  CONSTRAINT `fk_trans_lang` FOREIGN KEY (`lang_code`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek bir çeviri
INSERT INTO `translations` (`lang_code`, `translation_key`, `translation_value`) VALUES
('TR', 'nav.home', 'Anasayfa'),
('EN', 'nav.home', 'Home'),
('TR', 'contact.address', 'Örnek Mahallesi, Turizm Sokak No:1 Merkez/Türkiye'),
('EN', 'contact.address', 'Sample District, Tourism St. No:1 Center/Turkey');

-- --------------------------------------------------------

--
-- Tablo: `tours`
-- Turların dilden bağımsız (fiyat, tarih, kontenjan vb.) evrensel bilgileri
--
CREATE TABLE `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quota` int(11) NOT NULL DEFAULT 0 COMMENT 'Tur Kontenjanı',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `start_date` (`start_date`),
  KEY `end_date` (`end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo: `tour_translations`
-- Turların her dile özel bilgileri (İsim, Açıklama, Özel Şartlar)
--
CREATE TABLE `tour_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `lang_code` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `special_conditions` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tour_lang_unique` (`tour_id`, `lang_code`),
  KEY `lang_code` (`lang_code`),
  CONSTRAINT `fk_tt_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tt_lang` FOREIGN KEY (`lang_code`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo: `tour_images`
-- Tur fotoğrafları (Bir tura maksimum 8 adet eklenebileceği formda belirtilmişti)
--
CREATE TABLE `tour_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL COMMENT 'Sunucudaki dosya yolu',
  `sort_order` tinyint(2) NOT NULL DEFAULT 0 COMMENT 'Görsellerin sıralaması (0-8)',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `fk_image_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
