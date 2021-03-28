CREATE DATABASE suivi_culture;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `roles` varchar(40) DEFAULT NULL,
  `status` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `plante` (
  `id_plante` int NOT NULL AUTO_INCREMENT,
  `variete` varchar(255) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `origine` varchar(255) DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_plante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chambre_culture` (
  `id_chambre` int NOT NULL AUTO_INCREMENT,
  `fk_id_user` int DEFAULT NULL,
  `fk_id_plante` int DEFAULT NULL,
  `fonction` varchar(255) DEFAULT NULL,
  `longueur` varchar(255) DEFAULT NULL,
  `largeur` varchar(255) DEFAULT NULL,
  `hauteur` varchar(255) DEFAULT NULL,
  `surface` varchar(255) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_chambre`),
  KEY `fk_id_plante` (`fk_id_plante`),
  KEY `fk_id_user` (`fk_id_user`),
  CONSTRAINT `chambre_culture_ibfk_1` FOREIGN KEY (`fk_id_plante`) REFERENCES `plante` (`id_plante`),
  CONSTRAINT `chambre_culture_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `fruit` (
  `id_fruit` int NOT NULL AUTO_INCREMENT,
  `origine` varchar(255) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `variete` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fruit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `herbe` (
  `id_herbe` int NOT NULL AUTO_INCREMENT,
  `origine` varchar(100) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `variete` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_herbe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `image` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `suivi` (
  `id_suivi` int NOT NULL AUTO_INCREMENT,
  `fk_id_plante` int DEFAULT NULL,
  `fk_id_image` int DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `humidite` varchar(255) DEFAULT NULL,
  `ph` varchar(255) DEFAULT NULL,
  `ec` varchar(255) DEFAULT NULL,
  `hauteur` varchar(255) DEFAULT NULL,
  `commentaire` text,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_suivi`),
  KEY `fk_id_plante` (`fk_id_plante`),
  KEY `fk_id_image` (`fk_id_image`),
  CONSTRAINT `suivi_ibfk_1` FOREIGN KEY (`fk_id_plante`) REFERENCES `plante` (`id_plante`),
  CONSTRAINT `suivi_ibfk_2` FOREIGN KEY (`fk_id_image`) REFERENCES `image` (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
