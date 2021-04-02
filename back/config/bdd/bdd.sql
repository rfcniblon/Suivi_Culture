CREATE DATABASE suivi_de_potager;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isverified` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `legumes` (
  `id_legume` int NOT NULL AUTO_INCREMENT,
  `fk_id_image` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `depart` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_legume`),
  KEY `fk_id_image` (`fk_id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `potagers` (
  `id_potager` int NOT NULL AUTO_INCREMENT,
  `fk_id_user` int DEFAULT NULL,
  `fk_id_legume` int DEFAULT NULL,
  `date` DATETIME DEFAULT NULL,
  `fonction` varchar(255) DEFAULT NULL,
  `longueur` varchar(255) DEFAULT NULL,
  `largeur` varchar(255) DEFAULT NULL,
  `hauteur` varchar(255) DEFAULT NULL,
  `surface` varchar(255) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_potager`),
  KEY `fk_id_legume` (`fk_id_legume`),
  KEY `fk_id_user` (`fk_id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `suivis` (
  `id_suivi` int NOT NULL AUTO_INCREMENT,
  `fk_id_legume` int DEFAULT NULL,
  `fk_id_image` int DEFAULT NULL,
  `date` DATETIME DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `humidite` varchar(255) DEFAULT NULL,
  `ph` varchar(255) DEFAULT NULL,
  `ec` varchar(255) DEFAULT NULL,
  `hauteur` varchar(255) DEFAULT NULL,
  `commentaire` text,
  PRIMARY KEY (`id_suivi`),
  KEY `fk_id_legume` (`fk_id_legume`),
  KEY `fk_id_image` (`fk_id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `legumes`
  ADD CONSTRAINT `legumes_ibfk_1` FOREIGN KEY (`fk_id_image`) REFERENCES `images` (`id_image`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `potagers`
  ADD CONSTRAINT `potagers_ibfk_1` FOREIGN KEY (`fk_id_legume`) REFERENCES `legumes` (`id_legume`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `potagers_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `suivis`
  ADD CONSTRAINT `suivis_ibfk_1` FOREIGN KEY (`fk_id_legume`) REFERENCES `legumes` (`id_legume`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `suivis_ibfk_2` FOREIGN KEY (`fk_id_image`) REFERENCES `images` (`id_image`) ON DELETE CASCADE ON UPDATE CASCADE;
