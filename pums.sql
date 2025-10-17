-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2025 at 10:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pums`
--

-- --------------------------------------------------------

--
-- Table structure for table `log_history_pc`
--

CREATE TABLE `log_history_pc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time_in` varchar(100) NOT NULL,
  `time_out` varchar(100) NOT NULL,
  `room` varchar(100) NOT NULL,
  `pc_name` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_content` text NOT NULL,
  ADD PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_history_room`
--

CREATE TABLE `log_history_room` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time_in` varchar(100) NOT NULL,
  `time_out` varchar(100) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  `school_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_history_room`
--

INSERT INTO `log_history_room` (`id`, `name`, `date`, `time_in`, `time_out`, `room_name`, `school_id`) VALUES
(1, 'john doe', '06-05-2025', '3:16 PM', '4:00 PM', 'COT-303', '6201001');

-- --------------------------------------------------------

--
-- Table structure for table `registered_students`
--

CREATE TABLE `registered_students` (
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `school_id` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_students`
--

INSERT INTO `registered_students` (`uid`, `name`, `school_id`, `gender`) VALUES
('022311', 'Tanjiro', '6201222', 'Male'),
('123312', 'Mateo G. Gabato', '6201991', 'Male'),
('14001', 'Student 7', '8278', 'Male'),
('22221', 'John Ed Dacillo', '6201962', 'Male'),
('35396', 'Student 9', '2263', 'Male'),
('39582', 'Student 0', '6560', 'Female'),
('47294', 'Student 4', '1823', 'Male'),
('51277', 'Student 1', '3572', 'Female'),
('51645', 'Student 2', '6994', 'Male'),
('53389', 'Student 5', '3634', 'Male'),
('76265', 'Student 6', '8163', 'Female'),
('82075', 'Student 8', '7945', 'Male'),
('88606', 'Student 3', '3668', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `registered_teachers`
--

CREATE TABLE `registered_teachers` (
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `school_id` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_teachers`
--

INSERT INTO `registered_teachers` (`uid`, `name`, `school_id`, `gender`) VALUES
('000002', 'Jinky Apurado', '6201967', 'Female'),
('01010101', 'Norman Sambillad', '6209010', 'Male'),
('02231', 'Mark Lexter Baticura', '6209119', 'Male'),
('022310', 'Kakashi', '6201977', 'Male'),
('20795', 'Teacher 2', '8893', 'Female'),
('222212', 'Jhon Kelvin Aying', '6201970', 'Male'),
('30829', 'Teacher 3', '9158', 'Male'),
('53688', 'Teacher 0', '1499', 'Male'),
('59472', 'Teacher 1', '3138', 'Female'),
('66399', 'Teacher 4', '7236', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log_history_pc`
--
ALTER TABLE `log_history_pc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_history_room`
--
ALTER TABLE `log_history_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered_students`
--
ALTER TABLE `registered_students`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `registered_teachers`
--
ALTER TABLE `registered_teachers`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log_history_pc`
--
ALTER TABLE `log_history_pc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_history_room`
--
ALTER TABLE `log_history_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
