-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2021 at 09:37 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clover-hire`
--

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `nama_perusahaan` varchar(255) DEFAULT NULL,
  `posisi` varchar(255) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `hire`
--

CREATE TABLE `hire` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `tujuan_pesan` varchar(255) NOT NULL,
  `pesan` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hire`
--

INSERT INTO `hire` (`id`, `user_id`, `tujuan_pesan`, `pesan`, `createdAt`, `updatedAt`) VALUES
('3d91d8f4-bd3d-4182-95fa-05cb2d041ecd', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:32:50', '2021-11-08 06:32:50'),
('3de0ae89-34ee-43ca-8d37-43c9c0adf49b', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:26:16', '2021-11-08 06:26:16'),
('42488e38-15a8-4b7d-b51a-f6e130986b6b', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:25:44', '2021-11-08 06:25:44'),
('485d6423-30ca-4b7d-8184-ece633874465', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:29:26', '2021-11-08 06:29:26'),
('4a91beb3-b6e3-47b7-a52a-9dbb2118e551', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:27:17', '2021-11-08 06:27:17'),
('4be7b8a1-713e-4602-8e83-4633e009eed2', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:21:03', '2021-11-08 06:21:03'),
('5a936b46-6044-4a7a-a36b-9da283c9976a', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:25:21', '2021-11-08 06:25:21'),
('7347630d-ce28-45aa-8128-a861c588502b', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:26:07', '2021-11-08 06:26:07'),
('bc05b82d-a7dc-4066-9e34-bee8d1120309', '50c04720-5ab1-43c3-a4af-e4402481d5f2', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:35:34', '2021-11-08 06:35:34'),
('c018c641-a49e-4366-9d8f-819825ec49ab', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:20:12', '2021-11-08 06:20:12'),
('c3b73cf4-d094-462d-be01-4219b0031afb', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:28:59', '2021-11-08 06:28:59'),
('cd2dc806-9595-4f58-947b-03013de6890c', '3232432', 'Freelance', 'Saya tertarik dengan portfolio yang sudah kamu buat, apakah anda mau bekerja sama dengan saya', '2021-11-08 06:24:52', '2021-11-08 06:24:52');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `nama_aplikasi` varchar(255) DEFAULT NULL,
  `link_repository` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `perusahaan` varchar(255) DEFAULT NULL,
  `bidangPerusahaan` varchar(255) DEFAULT NULL,
  `jobDesk` varchar(255) DEFAULT NULL,
  `jobStatus` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `noHandphone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `domisili` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `gitlab` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `role` enum('Pekerja','Perekrut') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `perusahaan`, `bidangPerusahaan`, `jobDesk`, `jobStatus`, `status`, `noHandphone`, `password`, `skill`, `image`, `domisili`, `description`, `instagram`, `github`, `gitlab`, `linkedin`, `role`, `createdAt`, `updatedAt`) VALUES
('1f217feb-bc79-45d5-a119-c6947f0cc39e', 'Jhon Doe', 'jhon@mail.com', 'PT Sejahtera', 'Bank', NULL, NULL, NULL, '0827367263', '$2b$10$Gz5ozKUWxxf.acIcX7ipQu67Qnad3eIoLKMs600clvcnZrlSbsmDm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Perekrut', '2021-11-08 09:34:22', '2021-11-08 09:34:22'),
('3232432', 'Johan Simanjuntak', 'johan323871@gmail.com', NULL, NULL, 'FullStack Developer', '', 'active', '0872773265232', 'johan123', NULL, NULL, 'Jakarta', 'Im Web Developer from jakarta', 'johando', 'johando', 'johando', 'johando', 'Perekrut', '2021-11-06 06:49:06', '2021-11-06 06:49:06'),
('456e4835-bf46-40c0-93da-a326cc5cd8da', 'Jhon Doe', 'jhon@mail.com', 'PT Sejahtera', 'Bank', NULL, '', 'active', '0827367263', '$2b$10$D3vXa0tfIecndPghkfN33Os1g6osE98YyRv3xVVq0NM1zcazkOXAW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Perekrut', '2021-11-07 05:53:17', '2021-11-07 05:53:17'),
('50c04720-5ab1-43c3-a4af-e4402481d5f2', 'Rino', 'test.spam.rino@gmail.com', 'PT NERO', 'FINTECH', NULL, '', 'active', '08238761', '$2b$10$w3LD.qpzV0RbINZ54sbeXeQUQdPaFKFugxO9rzeW7EybtSJGwCoYu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Perekrut', '2021-11-07 05:40:02', '2021-11-07 05:40:02'),
('7ea4186d-bc42-4cbb-ba2f-1ea56aa08af8', 'Jhon Doe', 'jhon@mail.com', NULL, NULL, NULL, NULL, NULL, '0827367263', '$2b$10$anU1pD1Z9v1MK26PvHu2Ee2dlXeu6Os0NgOE7k1ZFxNIUYy3a3E5m', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pekerja', '2021-11-08 09:36:32', '2021-11-08 09:36:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
