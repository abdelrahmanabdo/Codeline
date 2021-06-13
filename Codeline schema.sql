CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `phone` varchar(255),
  `name` varchar(255),
  `email` varchar(255),
  `avatar` varchar(255),
  `pin_code` varchar(255),
  `is_active` boolean,
  `is_online` boolean,
  `last_online` timestamp,
  `created_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `OTPs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `otp_code` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `user_profiles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `nickname` varchar(255),
  `birth_date` varchar(255),
  `martial_status_id` int,
  `location_id` int,
  `CV` varchar(255),
  `bio` text,
  `password` varchar(255)
);

CREATE TABLE `user_projects` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `title` varchar(255),
  `description` longtext,
  `image` varchar(255)
);

CREATE TABLE `user_gallary` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `title` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `user_occasions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `ocassion_id` int,
  `date` varchar(255)
);

CREATE TABLE `user_settings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `receive_noti` boolean,
  `create_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `chats` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255),
  `name` varchar(255),
  `create_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `chats_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `chat_id` int,
  `user_id` int
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `chat_id` int,
  `type_id` int,
  `message` text,
  `seen` boolean,
  `create_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `calls` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255),
  `duration` varchar(255),
  `ended_at` timestamp,
  `create_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `calls_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `call_id` int,
  `user_id` int
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255)
);

CREATE TABLE `occassions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title_ar` varchar(255),
  `title_en` varchar(255)
);

CREATE TABLE `cities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean
);

CREATE TABLE `marital_statuses` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `active` boolean
);

CREATE TABLE `message_types` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(255)
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `OTPs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_profiles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_profiles` ADD FOREIGN KEY (`martial_status_id`) REFERENCES `marital_statuses` (`id`);

ALTER TABLE `user_profiles` ADD FOREIGN KEY (`location_id`) REFERENCES `cities` (`id`);

ALTER TABLE `user_projects` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_gallary` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_occasions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_occasions` ADD FOREIGN KEY (`ocassion_id`) REFERENCES `occassions` (`id`);

ALTER TABLE `user_settings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `chats_users` ADD FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`);

ALTER TABLE `chats_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`type_id`) REFERENCES `message_types` (`id`);

ALTER TABLE `calls_users` ADD FOREIGN KEY (`call_id`) REFERENCES `calls` (`id`);

ALTER TABLE `calls_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
