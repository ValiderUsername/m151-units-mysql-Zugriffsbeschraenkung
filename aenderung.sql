USE `movie-db`;
ALTER TABLE `Movies` ADD COLUMN `user` INTEGER;
ALTER TABLE `Movies` ADD COLUMN `public` INTEGER;

UPDATE `Movies` SET `public`=1;