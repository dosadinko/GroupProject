-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 20, 2018 at 11:15 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password`, `username`) VALUES
(1, 'dosadinko@hotmail.com', '9845f678c88e286128db7b8e1277f70c5783c81b8bc40e04a80ad46e24fbca3d', 'dosadinko'),
(2, 'trol', 'd67100b7daece098c7e4fa1a360f1a2d8ec88ef6a2e6d168e6788e19f2806f72', 'trol'),
(3, 'dsadpoak@dsa.co', '40348e66821c328944a2af6a13aa267ddebee3d1af4ad0718d4cc362b5555b86', 'dsokpad'),
(4, 'dsada@dlqpalsd.com', '2ad57731c934c4c4c7cc88af3481039331710e940e50c8c725c5ae45854047a0', 'as'),
(5, 'dosadsdsdinko@hotmail.com', '8ffc913a903f412a2b8f654202699c760ac5bd98c262d3c0eebab5810a163666', 'sdadasda'),
(6, 'dmisic@gmail.com', '9757ad62a7505cb4fbbd155d46e9015e625f78c844635baed750301b2f4a863d', 'Dejan');

-- --------------------------------------------------------

--
-- Table structure for table `expences`
--

DROP TABLE IF EXISTS `expences`;
CREATE TABLE IF NOT EXISTS `expences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `payee` varchar(255) NOT NULL,
  `amount_payed` decimal(18,2) NOT NULL,
  `currency_type` varchar(5) NOT NULL,
  `expence_date` bigint(20) NOT NULL,
  `payed_date` bigint(20) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expences`
--

INSERT INTO `expences` (`id`, `description`, `payee`, `amount_payed`, `currency_type`, `expence_date`, `payed_date`, `account_id`) VALUES
(1, 'Neke pare vamo', 'ismet celo', '2354.00', 'BAM', 13213132, 2147483647, 1),
(2, 'dsadas', 'dsadsa', '2321.00', 'ban', 2004, 1998, 1),
(3, 'eqweqw', 'dsadsa', '2321.00', 'ban', 2004, 1998, 1),
(4, 'sdadasd', 'sdadasdsa', '12321.00', 'vds', 2147483647, 2147483647, 1),
(5, 'dsadasd', 'dsadsadadsa', '234.00', 'bam', 2147483647, 2147483647, 2),
(6, 'dsa', 'dsada', '32.00', 'baas', 2147483647, 2147483647, 2),
(7, 'dsa', 'dsada', '32.00', 'baas', 2147483647, 2147483647, 2),
(8, 'dsadas', 'adsdas', '2323.00', 'ase', 2147483647, 2147483647, 1),
(9, 'dsadas', 'qwert', '21312.00', 'sad', 2147483647, 2147483647, 1),
(20, 'Deksonja', 'deki', '213.00', 'rur', 1526860800000, 1526860800000, 6),
(21, 'Deksonja', 'deki', '213.00', 'rur', 1526860800000, 1526860800000, 6),
(22, 'Deksonja', 'deki', '213.00', 'rur', 1526860800000, 1526860800000, 6),
(23, 'das', 'sad', '231.00', 'das', 1526860800000, 1526860800000, 6),
(24, 'das', 'sad', '231.00', 'das', 1526860800000, 1526860800000, 6);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expences`
--
ALTER TABLE `expences`
  ADD CONSTRAINT `expences_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
