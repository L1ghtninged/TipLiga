CREATE DATABASE  IF NOT EXISTS `tipovacka` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tipovacka`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: tipovacka
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kolo`
--

DROP TABLE IF EXISTS `kolo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kolo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cislo_kola` int NOT NULL,
  `is_closed` tinyint(1) DEFAULT '0',
  `closed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cislo_kola` (`cislo_kola`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kolo`
--

LOCK TABLES `kolo` WRITE;
/*!40000 ALTER TABLE `kolo` DISABLE KEYS */;
INSERT INTO `kolo` VALUES (1,1,1,'2026-08-10 19:53:00'),(2,2,1,'2026-08-10 20:03:09'),(3,3,0,NULL),(4,4,0,NULL),(5,5,0,NULL),(6,6,0,NULL),(7,7,0,NULL),(8,8,0,NULL),(9,9,0,NULL),(10,10,0,NULL),(11,11,0,NULL),(12,12,0,NULL),(13,13,0,NULL),(14,14,0,NULL),(15,15,0,NULL),(16,16,0,NULL),(17,17,0,NULL),(18,18,0,NULL),(19,19,0,NULL),(20,20,0,NULL),(21,21,0,NULL),(22,22,0,NULL),(23,23,0,NULL),(24,24,0,NULL),(25,25,0,NULL),(26,26,0,NULL),(27,27,0,NULL),(28,28,0,NULL),(29,29,0,NULL),(30,30,0,NULL);
/*!40000 ALTER TABLE `kolo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predpovedumisteni`
--

DROP TABLE IF EXISTS `predpovedumisteni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predpovedumisteni` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uzivatel_id` int NOT NULL,
  `tym_id` int NOT NULL,
  `predpoved_pozice` int NOT NULL,
  `body_ziskane` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_team` (`uzivatel_id`,`tym_id`),
  KEY `tym_id` (`tym_id`),
  CONSTRAINT `predpovedumisteni_ibfk_1` FOREIGN KEY (`uzivatel_id`) REFERENCES `uzivatel` (`id`) ON DELETE CASCADE,
  CONSTRAINT `predpovedumisteni_ibfk_2` FOREIGN KEY (`tym_id`) REFERENCES `tym` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predpovedumisteni`
--

LOCK TABLES `predpovedumisteni` WRITE;
/*!40000 ALTER TABLE `predpovedumisteni` DISABLE KEYS */;
/*!40000 ALTER TABLE `predpovedumisteni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predpovedvysledku`
--

DROP TABLE IF EXISTS `predpovedvysledku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predpovedvysledku` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uzivatel_id` int NOT NULL,
  `zapas_id` int NOT NULL,
  `predpoved_domaci_skore` int NOT NULL,
  `predpoved_hostujici_skore` int NOT NULL,
  `is_joker` tinyint(1) DEFAULT '0',
  `body_ziskane` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_match` (`uzivatel_id`,`zapas_id`),
  KEY `zapas_id` (`zapas_id`),
  CONSTRAINT `predpovedvysledku_ibfk_1` FOREIGN KEY (`uzivatel_id`) REFERENCES `uzivatel` (`id`) ON DELETE CASCADE,
  CONSTRAINT `predpovedvysledku_ibfk_2` FOREIGN KEY (`zapas_id`) REFERENCES `zapas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predpovedvysledku`
--

LOCK TABLES `predpovedvysledku` WRITE;
/*!40000 ALTER TABLE `predpovedvysledku` DISABLE KEYS */;
INSERT INTO `predpovedvysledku` VALUES (17,3,7,2,0,0,0,'2026-08-10 19:52:19'),(18,3,8,0,1,0,15,'2026-08-10 19:52:59'),(19,3,18,0,0,0,0,'2026-08-10 19:52:19'),(20,3,5,0,3,0,0,'2026-08-10 19:52:19'),(21,3,17,2,1,1,8,'2026-08-10 19:52:59'),(22,3,3,1,3,0,0,'2026-08-10 19:52:19'),(23,3,2,2,2,0,0,'2026-08-10 19:52:19'),(24,3,1,0,3,0,4,'2026-08-10 19:52:59'),(25,3,16,3,0,0,4,'2026-08-10 20:03:09'),(26,3,13,0,2,0,4,'2026-08-10 20:03:09'),(27,3,14,1,1,1,30,'2026-08-10 20:03:09'),(28,3,15,2,2,0,0,'2026-08-10 19:54:51'),(29,3,12,2,1,0,0,'2026-08-10 19:54:51'),(30,3,11,1,3,0,0,'2026-08-10 19:54:51'),(31,3,10,1,2,0,0,'2026-08-10 19:54:51'),(32,3,9,0,2,0,15,'2026-08-10 20:03:09');
/*!40000 ALTER TABLE `predpovedvysledku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_settings`
--

DROP TABLE IF EXISTS `system_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(50) NOT NULL,
  `setting_value` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_settings`
--

LOCK TABLES `system_settings` WRITE;
/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;
INSERT INTO `system_settings` VALUES (1,'season_tips_locked','false');
/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tym`
--

DROP TABLE IF EXISTS `tym`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tym` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazev` varchar(50) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nazev` (`nazev`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tym`
--

LOCK TABLES `tym` WRITE;
/*!40000 ALTER TABLE `tym` DISABLE KEYS */;
INSERT INTO `tym` VALUES (2,'Bohemians','/team-logos/bohemians.svg'),(4,'Sparta Praha','/team-logos/sparta.svg'),(5,'Slavia Praha','/team-logos/slavia.svg'),(6,'Jablonec','/team-logos/jablonec.svg'),(7,'Mladá Boleslav','/team-logos/boleslav.svg'),(8,'Teplice','/team-logos/teplice.svg'),(9,'Hradec Králové','/team-logos/hradec.svg'),(10,'Slovan Liberec','/team-logos/liberec.svg'),(11,'Zbrojovka Brno','/team-logos/zbrojovka.svg'),(12,'Sigma Olomouc','/team-logos/olomouc.svg'),(13,'Baník Ostrava','/team-logos/banik.svg'),(14,'Viktoria Plzeň','/team-logos/plzen.svg'),(15,'Artis Brno','/team-logos/artis.svg'),(16,'Slovácko','/team-logos/slovacko.svg'),(17,'Pardubice','/team-logos/pardubice.svg'),(18,'Zlín','/team-logos/zlin.svg');
/*!40000 ALTER TABLE `tym` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uzivatel`
--

DROP TABLE IF EXISTS `uzivatel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uzivatel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pocet_bodu` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uzivatel`
--

LOCK TABLES `uzivatel` WRITE;
/*!40000 ALTER TABLE `uzivatel` DISABLE KEYS */;
INSERT INTO `uzivatel` VALUES (3,'David',80,'2026-08-10 19:48:51','scrypt:32768:8:1$clv4Km2rMBMMUV6R$572c0b85276fd67a541ae76e60a4f142af0dc3e7acf91ef39329c0f45d01fbb90c4b06da1cce12e4e7bb249081bed186003da464a6b61bd00a22262237e78f06');
/*!40000 ALTER TABLE `uzivatel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zapas`
--

DROP TABLE IF EXISTS `zapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zapas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kolo_id` int NOT NULL,
  `domaci_tym_id` int NOT NULL,
  `hostujici_tym_id` int NOT NULL,
  `domaci_skore` int DEFAULT NULL,
  `hostujici_skore` int DEFAULT NULL,
  `zacatek_zapasu` datetime NOT NULL,
  `stav` enum('scheduled','played','postponed') DEFAULT 'scheduled',
  PRIMARY KEY (`id`),
  KEY `kolo_id` (`kolo_id`),
  KEY `domaci_tym_id` (`domaci_tym_id`),
  KEY `hostujici_tym_id` (`hostujici_tym_id`),
  CONSTRAINT `zapas_ibfk_1` FOREIGN KEY (`kolo_id`) REFERENCES `kolo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `zapas_ibfk_2` FOREIGN KEY (`domaci_tym_id`) REFERENCES `tym` (`id`),
  CONSTRAINT `zapas_ibfk_3` FOREIGN KEY (`hostujici_tym_id`) REFERENCES `tym` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zapas`
--

LOCK TABLES `zapas` WRITE;
/*!40000 ALTER TABLE `zapas` DISABLE KEYS */;
INSERT INTO `zapas` VALUES (1,1,15,7,2,4,'2026-07-27 18:00:00','played'),(2,1,9,17,2,1,'2026-07-26 20:00:00','played'),(3,1,6,12,2,1,'2026-07-26 17:30:00','played'),(5,1,11,4,3,1,'2026-07-25 20:00:00','played'),(7,1,14,10,1,3,'2026-07-25 17:00:00','played'),(8,1,18,13,0,1,'2026-07-25 17:00:00','played'),(9,2,17,6,0,2,'2026-08-02 20:00:00','played'),(10,2,2,9,0,0,'2026-08-02 17:30:00','played'),(11,2,12,7,2,2,'2026-08-02 15:00:00','played'),(12,2,14,11,1,1,'2026-08-01 20:00:00','played'),(13,2,13,5,0,4,'2026-08-01 17:00:00','played'),(14,2,16,15,1,1,'2026-08-01 17:00:00','played'),(15,2,10,8,0,1,'2026-08-01 17:00:00','played'),(16,2,4,18,3,1,'2026-07-31 19:00:00','played'),(17,1,5,16,5,1,'2026-07-26 15:00:00','played'),(18,1,8,2,3,1,'2026-07-25 17:00:00','played'),(19,3,15,12,NULL,NULL,'2026-08-09 20:00:00','scheduled');
/*!40000 ALTER TABLE `zapas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tipovacka'
--

--
-- Dumping routines for database 'tipovacka'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-11  0:32:40
