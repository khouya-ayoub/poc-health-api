-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           8.0.17 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour health_api
CREATE DATABASE IF NOT EXISTS `health_api` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `health_api`;

-- Listage de la structure de la table health_api. patients
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sexe` varchar(50) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `cardiac` float DEFAULT NULL,
  `breath` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Data patients';

-- Listage des données de la table health_api.patients : ~0 rows (environ)
DELETE FROM `patients`;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` (`id`, `firstname`, `lastname`, `age`, `sexe`, `weight`, `cardiac`, `breath`) VALUES
	(1, 'Hamza', 'HRAMCHI', 24, 'H', 78, 50, 43),
	(2, 'Ayoub', 'KHOUYA', 23, 'H', 68, 52, 40),
	(3, 'Yahya', 'MOUSAOUI', 24, 'H', 70, 49, 40),
	(4, 'Farah', 'EL HADRI', 23, 'F', 55, 46, 38),
	(5, 'Meryeme', 'ATABIT', 23, 'F', 60, 50, 43);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
