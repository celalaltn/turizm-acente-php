-- Schema alignment for older installations (setup.sql v1)
-- Run statements that apply to your current schema.

-- settings: rename key/value columns to setting_key/setting_value
ALTER TABLE `settings`
  CHANGE `key` `setting_key` varchar(100) NOT NULL,
  CHANGE `value` `setting_value` text NULL;

ALTER TABLE `settings`
  ADD COLUMN `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp();

-- translations: rename key/value columns to translation_key/translation_value
ALTER TABLE `translations`
  CHANGE `key` `translation_key` varchar(100) NOT NULL,
  CHANGE `value` `translation_value` text NOT NULL;

-- tours: add missing columns used by the API
ALTER TABLE `tours`
  ADD COLUMN `is_active` tinyint(1) NOT NULL DEFAULT 1,
  ADD COLUMN `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp();

-- ensure date fields are not null
UPDATE `tours` SET `end_date` = `start_date` WHERE `end_date` IS NULL;
ALTER TABLE `tours`
  MODIFY `start_date` date NOT NULL,
  MODIFY `end_date` date NOT NULL;

-- tour_images: add sort_order and created_at
ALTER TABLE `tour_images`
  ADD COLUMN `sort_order` tinyint(2) NOT NULL DEFAULT 0,
  ADD COLUMN `created_at` timestamp NOT NULL DEFAULT current_timestamp();
