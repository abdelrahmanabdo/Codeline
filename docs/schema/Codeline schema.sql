CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int DEFAULT 1,
  `phone` varchar(255),
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(150),
  `pin_code` int(4) DEFAULT 0000,
  `avatar` varchar(255),
  `device_id` text,
  `qb_id` text,
  `is_online` boolean DEFAULT true,
  `last_online` timestamp DEFAULT CURRENT_TIMESTAMP,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp
);

CREATE TABLE `OTPs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `otp_code` varchar(255),
  `verified` boolean DEFAULT false,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_profile` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `nickname` varchar(255),
  `birth_date` varchar(255),
  `marital_status_id` int,
  `location_id` int,
  `CV` varchar(255),
  `bio` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_projects` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `title` varchar(255),
  `description` longtext,
  `image` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_project_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `project_id` int,
  `image` varchar(255),
  `price` float DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_gallery` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `title` varchar(255),
  `image` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_occasions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `occasion_id` int,
  `date` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_settings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `receive_noti` boolean,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `contacts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `contact_id` int,
  `contact_name` varchar(255),
  `is_blocked` boolean Default false,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `chats` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255),
  `name` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp
);

CREATE TABLE `chat_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `chat_id` int,
  `user_id` int,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `chat_id` int,
  `user_id` int,
  `type` int,
  `message` text,
  `seen` boolean Default false,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp
);

CREATE TABLE `calls` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255),
  `duration` varchar(255),
  `ended_at` timestamp,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp
);

CREATE TABLE `call_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `call_id` int,
  `user_id` int,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `languages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `occasions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `cities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `marital_statuses` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `stories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `type` varchar(10) Default "Image",
  `story` varchar(255),
  `caption` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
);


ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `OTPs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_profile` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_profile` ADD FOREIGN KEY (`marital_status_id`) REFERENCES `marital_statuses` (`id`);

ALTER TABLE `user_profile` ADD FOREIGN KEY (`location_id`) REFERENCES `cities` (`id`);

ALTER TABLE `user_projects` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_project_images` ADD FOREIGN KEY (`project_id`) REFERENCES `user_projects` (`id`);

ALTER TABLE `user_gallery` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_occasions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_occasions` ADD FOREIGN KEY (`occasion_id`) REFERENCES `occasions` (`id`);

ALTER TABLE `user_settings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `chat_users` ADD FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`);

ALTER TABLE `chat_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `contacts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `contacts` ADD FOREIGN KEY (`contact_id`) REFERENCES `users` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `stories` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `call_users` ADD FOREIGN KEY (`call_id`) REFERENCES `calls` (`id`);

ALTER TABLE `call_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
