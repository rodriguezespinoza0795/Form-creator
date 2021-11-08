use test;

CREATE TABLE `c_form_input_types` (
   `id` int (11) NOT NULL AUTO_INCREMENT,
   `name` varchar(100) NOT NULL,
   `type` varchar(45) NOT NULL,
   `tag` varchar(45) NOT NULL,
   `description` varchar(255) DEFAULT NULL,
   `is_active` tinyint(1) NOT NULL DEFAULT 1,
   `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   PRIMARY KEY (`id`),
   UNIQUE KEY `name_UNIQUE` (`name`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Multiple choices','checkbox','input','Checkboxes let a user select ZERO or MORE options of a limited number of choices.');
INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Date','date','input','Is used for input fields that should contain a date');
INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Single choice','radio','input','Radio buttons let a user select ONLY ONE of a limited number of choices');
INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Dropdown','select','select','Element is used to create a list');
INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Short answer','text','input','Displays a single-line text input field');
INSERT INTO `c_form_input_types` (`name`,`type`,`tag`,`description`) VALUES ('Paragraph','textarea','textarea','Displays a multi-line text input field');

CREATE TABLE `users` (
   `id` int (11) NOT NULL AUTO_INCREMENT,
   `email` varchar(100) DEFAULT NULL,
   `password` varchar (200) DEFAULT NULL,
   `is_active` tinyint(1) DEFAULT 1,
   PRIMARY KEY (`id`),
   UNIQUE KEY `email_UNIQUE`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `items`
(
   `id` int
(11) NOT NULL AUTO_INCREMENT,
   `title` varchar
(100) DEFAULT NULL,
   `description` varchar
(200) DEFAULT NULL,
   `owner_id` int
(11) DEFAULT NULL,
   PRIMARY KEY
(`id`),
   KEY `owner_idx`
(`owner_id`),
   CONSTRAINT `owner` FOREIGN KEY
(`owner_id`) REFERENCES `users`
(`id`) ON
DELETE NO ACTION ON
UPDATE NO ACTION
 ) ENGINE=InnoDB
DEFAULT CHARSET=latin1


