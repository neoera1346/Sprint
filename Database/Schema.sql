DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;
USE chat;

/* Create other tables and define schemas for them here! */

/*  
Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.
*/

 CREATE TABLE `users` (
  `id` int not NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) not NULL
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `text` varchar(255) not NULL,
  `roomname` varchar(255) not NULL,
  `created_at` timestamp not NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `messages` ADD userId int;
ALTER TABLE `messages` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);