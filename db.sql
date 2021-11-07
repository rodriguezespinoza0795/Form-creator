use test;

CREATE TABLE `users`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `email` varchar
(100) DEFAULT NULL,
  `password` varchar
(200) DEFAULT NULL,
  `is_active` tinyint
(1) DEFAULT 1,
  PRIMARY KEY
(`id`),
  UNIQUE KEY `email_UNIQUE`
(`email`)
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