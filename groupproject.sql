-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2018 at 09:59 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

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

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password`, `username`) VALUES
(1, 'dosadinko@hotmail.com', '9845f678c88e286128db7b8e1277f70c5783c81b8bc40e04a80ad46e24fbca3d', 'dosadinko'),
(2, 'trol', 'd67100b7daece098c7e4fa1a360f1a2d8ec88ef6a2e6d168e6788e19f2806f72', 'trol'),
(3, 'dsadpoak@dsa.co', '40348e66821c328944a2af6a13aa267ddebee3d1af4ad0718d4cc362b5555b86', 'dsokpad'),
(4, 'dsada@dlqpalsd.com', '2ad57731c934c4c4c7cc88af3481039331710e940e50c8c725c5ae45854047a0', 'as'),
(5, 'dosadsdsdinko@hotmail.com', '8ffc913a903f412a2b8f654202699c760ac5bd98c262d3c0eebab5810a163666', 'sdadasda'),
(6, 'senad@senad.com', '9845f678c88e286128db7b8e1277f70c5783c81b8bc40e04a80ad46e24fbca3d', 'senad'),
(7, 'ahmed@ahmed.doo', '9845f678c88e286128db7b8e1277f70c5783c81b8bc40e04a80ad46e24fbca3d', 'ahmed');

-- --------------------------------------------------------

--
-- Table structure for table `expences`
--

CREATE TABLE `expences` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `payee` varchar(255) NOT NULL,
  `amount_payed` decimal(18,2) NOT NULL,
  `currency_type` varchar(5) NOT NULL,
  `expence_date` varchar(255) NOT NULL,
  `payed_date` varchar(255) NOT NULL,
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expences`
--

INSERT INTO `expences` (`id`, `description`, `payee`, `amount_payed`, `currency_type`, `expence_date`, `payed_date`, `account_id`) VALUES
(4, 'Kokain', 'Dejan', '100.00', 'USD', '1525132800000', '1526601600000', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expences`
--
ALTER TABLE `expences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `expences`
--
ALTER TABLE `expences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
