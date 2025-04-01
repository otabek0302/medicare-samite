-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 30, 2024 at 10:59 AM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u806435594_medicaretest`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_notification`
--

CREATE TABLE `admin_notification` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `txn_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `body` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `all_transaction`
--

CREATE TABLE `all_transaction` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED DEFAULT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `payment_transaction_id` text DEFAULT NULL,
  `amount` double NOT NULL,
  `transaction_type` enum('Credited','Debited') NOT NULL,
  `is_wallet_txn` tinyint(1) NOT NULL DEFAULT 0,
  `last_wallet_amount` double DEFAULT NULL,
  `new_wallet_amount` double DEFAULT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('Pending','Confirmed','Rejected','Completed','Rescheduled','Cancelled','Visited') NOT NULL,
  `date` date NOT NULL,
  `time_slots` time NOT NULL,
  `doct_id` bigint(20) UNSIGNED NOT NULL,
  `dept_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('OPD','Video Consultant','Emergency') NOT NULL,
  `meeting_id` text DEFAULT NULL,
  `meeting_link` text DEFAULT NULL,
  `payment_status` enum('Paid','Unpaid','Partially Paid','Refunded') DEFAULT NULL,
  `current_cancel_req_status` enum('Initiated','Rejected','Approved','Processing') DEFAULT NULL,
  `source` enum('Android App','Ios App','Web','Admin','Front Desk','Doctor') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments_invoice_item`
--

CREATE TABLE `appointments_invoice_item` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(250) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` double NOT NULL,
  `unit_tax` double DEFAULT NULL,
  `unit_tax_amount` double DEFAULT NULL,
  `service_charge` double DEFAULT 0,
  `total_price` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_cancellation_req`
--

CREATE TABLE `appointment_cancellation_req` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('Initiated','Rejected','Approved','Processing') NOT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_checkin`
--

CREATE TABLE `appointment_checkin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_invoice`
--

CREATE TABLE `appointment_invoice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED DEFAULT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('Unpaid','Paid','Partially Paid','Cancelled') NOT NULL,
  `coupon_title` varchar(250) DEFAULT NULL,
  `coupon_value` double DEFAULT NULL,
  `coupon_off_amount` double DEFAULT NULL,
  `coupon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `total_amount` double NOT NULL,
  `invoice_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_payments`
--

CREATE TABLE `appointment_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `txn_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED DEFAULT NULL,
  `amount` double NOT NULL,
  `payment_time_stamp` timestamp NULL DEFAULT NULL,
  `payment_method` enum('Cash','Online','Other','Wallet','UPI') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_status_log`
--

CREATE TABLE `appointment_status_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(250) NOT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE `configurations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_name` varchar(250) NOT NULL,
  `group_name` enum('Video','Basic','Mobile App','Ambulance','Appointment','Firebase','Payment','Web') NOT NULL,
  `preferences` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `value` text DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `configurations`
--

INSERT INTO `configurations` (`id`, `id_name`, `group_name`, `preferences`, `title`, `value`, `description`, `created_at`, `updated_at`) VALUES
(1, 'zoom_client_id', 'Video', 1, 'Zoom Client Id', NULL, '', '2024-08-09 16:59:45', '2024-11-16 13:01:18'),
(2, 'zoom_client_secret', 'Video', 2, 'Zoom Client Secret', NULL, '', '2024-08-09 16:59:45', '2024-10-24 12:50:44'),
(3, 'zoom_account_id', 'Video', 2, 'Zoom Account Id', NULL, '', '2024-08-09 16:59:45', '2024-10-24 12:51:54'),
(4, 'logo', 'Basic', 1, 'Logo', 'configurations/2024-10-24-671a440c85bb9.png', '', '2024-08-09 16:59:45', '2024-10-24 12:56:44'),
(5, 'fav_icon', 'Basic', 2, 'Fav Icon', 'configurations/2024-12-16-675fcc0549114.png', '', '2024-08-09 16:59:45', '2024-12-16 06:43:17'),
(6, 'clinic_name', 'Basic', 4, 'Clinic', 'Medicare', '', '2024-08-09 16:59:45', '2024-12-13 18:19:35'),
(7, 'email', 'Basic', 5, 'Email', 'example@gmail.com', '', '2024-08-09 16:59:45', '2024-10-24 12:54:00'),
(8, 'phone', 'Basic', 6, 'Phone', '+911234567811', '', '2024-08-09 16:59:45', '2024-12-18 09:37:50'),
(9, 'phone_second', 'Basic', 7, 'Phone Second', '+911234567892', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(10, 'address', 'Basic', 8, 'Address', 'Clinic Address', '', '2024-08-09 16:59:45', '2024-09-03 06:41:19'),
(11, 'play_store_link', 'Mobile App', 8, 'Play Store Link', 'https://android', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(12, 'app_store_link', 'Mobile App', 8, 'App Store Link', 'https://ios', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(13, 'android_android_app_version', 'Mobile App', 8, 'Android App Version', '2.0.0', '', '2024-08-09 16:59:45', '2024-11-23 19:24:49'),
(14, 'android_update_box_enable', 'Mobile App', 8, 'Android Update Box Enable', 'false', '', '2024-08-09 16:59:45', '2024-10-24 12:57:14'),
(15, 'android_force_update_box_enable', 'Mobile App', 8, 'Android Force Update Box Enable', 'false', '', '2024-08-09 16:59:45', '2024-09-03 05:53:27'),
(16, 'android_technical_issue_enable', 'Mobile App', 8, 'Technical Issue Enable', 'false', '', '2024-08-09 16:59:45', '2024-09-26 06:07:54'),
(17, 'ios_app_version', 'Mobile App', 8, 'Ios App Version', '2.0.0', '', '2024-08-09 16:59:45', '2024-11-23 19:25:26'),
(18, 'ios_update_box_enable', 'Mobile App', 8, 'Ios Update Box Enable', 'false', '', '2024-08-09 16:59:45', '2024-09-02 13:38:09'),
(19, 'ios_force_update_box_enable', 'Mobile App', 8, 'Ios Force Update Box Enable', 'false', '', '2024-08-09 16:59:45', '2024-09-02 13:38:08'),
(20, 'ios_technical_issue_enable', 'Mobile App', 8, 'Ios Technical Issue Enable', 'false', '', '2024-08-09 16:59:45', '2024-09-02 13:38:07'),
(21, 'ambulance_btn_enable', 'Ambulance', 8, 'Ambulance Btn Enable', 'true', '', '2024-08-09 16:59:45', '2024-12-19 06:41:26'),
(22, 'ambulance_number', 'Ambulance', 8, 'Ambulance Number', '+9112345682900', '', '2024-08-09 16:59:45', '2024-09-02 13:55:50'),
(23, 'stop_booking', 'Appointment', 8, 'Stop Booking', 'true', '', '2024-08-09 16:59:45', '2024-12-20 17:50:05'),
(24, 'c_u_p_d_p_a', 'Mobile App', 4, 'Contact Us Page Description Patient App', 'You can contact us through Email: contactus@gmail.com we will reply in 2-3 working days.', '', '2024-08-09 16:59:45', '2024-09-03 06:07:23'),
(25, 's_p_d_p_a', 'Mobile App', 5, 'Share Page Description Patient App', 'Tell your friend to use this app by clicking the share button.', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(26, 'play_store_link_doctor_app', 'Mobile App', 8, 'Play Store Link Doctor App', 'https://android', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(27, 'app_store_link_doctor_app', 'Mobile App', 8, 'App Store Link Doctor App', 'https://ios', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(28, 'c_u_p_d_d_a', 'Mobile App', 4, 'Contact Us Page Description Doctor App', 'You can contact us through Email: contactus@gmail.com we will reply in 2-3 working days.', '', '2024-08-09 16:59:45', '2024-09-03 06:07:23'),
(29, 's_p_d_d_a', 'Mobile App', 5, 'Share Page Description Dcotor App', 'Tell your friend to use this app by clicking the share button.', '', '2024-08-09 16:59:45', '2024-09-02 04:14:38'),
(30, 'google_service_account_json', 'Firebase', 5, 'GOOGLE_SERVICE_ACCOUNT_JSON', '{\n        \"type\": \"service_account\",\n        \"project_id\": \"\",\n        \"private_key_id\": \"\",\n        \"private_key\": \"\",\n        \"client_email\": \"\",\n        \"client_id\": \"\",\n        \"auth_uri\": \"\",\n        \"token_uri\": \"\",\n        \"universe_domain\": \"\"\n      }', '', '2024-08-09 16:59:45', '2024-11-29 07:45:44'),
(31, 'coupon_enable', 'Payment', 5, 'Coupon Enable', 'true', '', '2024-08-09 16:59:45', '2024-12-03 18:26:46'),
(32, 'tax', 'Payment', 5, 'Tax', '5', '', '2024-08-09 16:59:45', '2024-10-30 07:44:48'),
(33, 'ma_doctor_image', 'Mobile App', 5, 'Doctor Image', 'configurations/2024-11-05-6729c267086c7.png', '300hX200w', '2024-08-09 16:59:45', '2024-11-05 06:59:51'),
(34, 'web_technical_issue_enable', 'Web', 10, 'Web Technical Issue Enable', 'false', '', '2024-09-26 19:53:04', '2024-12-12 10:33:29'),
(35, 'web_doctor_image', 'Web', 5, 'Doctor Image', 'configurations/2024-12-13-675c754d5c424.png', '300hX200w', '2024-08-09 16:59:45', '2024-12-13 17:56:29'),
(36, 'clinic_location_latitude', 'Basic', 5, 'Clinic Location Latitude', '25.193510089670976', 'Latitude', '2024-08-09 16:59:45', '2024-10-01 08:18:41'),
(37, 'clinic_location_longitude', 'Basic', 5, 'Clinic Location Longitude', '55.44446792664873', 'Longitude', '2024-08-09 16:59:45', '2024-10-01 08:18:41'),
(38, 'whatsapp', 'Basic', 6, 'Whatsapp', '+911234567890', '', '2024-08-09 16:59:45', '2024-12-19 08:13:15'),
(39, 'ambulance_phone', 'Basic', 6, 'Ambulance Phone', '+911234567890', '', '2024-08-09 16:59:45', '2024-10-24 12:55:05');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `value` double NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_use`
--

CREATE TABLE `coupon_use` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stop_booking` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `department` bigint(20) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `specialization` varchar(250) NOT NULL,
  `ex_year` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `video_appointment` tinyint(1) NOT NULL DEFAULT 1,
  `clinic_appointment` tinyint(1) NOT NULL DEFAULT 1,
  `emergency_appointment` tinyint(1) NOT NULL DEFAULT 0,
  `opd_fee` double NOT NULL DEFAULT 200,
  `video_fee` double NOT NULL DEFAULT 200,
  `emg_fee` double NOT NULL DEFAULT 200,
  `zoom_client_id` text DEFAULT NULL,
  `zoom_secret_id` text DEFAULT NULL,
  `insta_link` text DEFAULT NULL,
  `fb_linik` text DEFAULT NULL,
  `twitter_link` text DEFAULT NULL,
  `you_tube_link` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors_review`
--

CREATE TABLE `doctors_review` (
  `id` bigint(20) NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT 'patient_id\r\n',
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `description` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_notification`
--

CREATE TABLE `doctor_notification` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prescription_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `body` varchar(250) NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `family_members`
--

CREATE TABLE `family_members` (
  `id` bigint(11) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `f_name` varchar(250) NOT NULL,
  `l_name` varchar(250) NOT NULL,
  `isd_code` varchar(6) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_screen_image`
--

CREATE TABLE `login_screen_image` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `preferences` int(11) NOT NULL DEFAULT 0,
  `image` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `login_screen_image`
--

INSERT INTO `login_screen_image` (`id`, `preferences`, `image`, `created_at`, `updated_at`) VALUES
(23, 0, 'loginscreen/2024-08-26-66cccacc1326e.png', '2024-12-22 17:02:42', '2024-12-22 17:02:42');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `f_name` varchar(250) NOT NULL,
  `l_name` varchar(250) NOT NULL,
  `isd_code` varchar(6) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(250) DEFAULT NULL,
  `state` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `gender` enum('Male','Female','Other','') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_files`
--

CREATE TABLE `patient_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `file_name` varchar(250) NOT NULL,
  `file` text DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_gateway`
--

CREATE TABLE `payment_gateway` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` enum('Razorpay','Stripe') NOT NULL,
  `key` text NOT NULL,
  `secret` text NOT NULL,
  `webhook_secret_key` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_gateway`
--

INSERT INTO `payment_gateway` (`id`, `title`, `key`, `secret`, `webhook_secret_key`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Razorpay', 'rzp_test_sIR4XxBJqqnGUD', 'vmtaVsSP9kze3eLvlT8pqYMY', 'abasdiu72378et23hbsd0276849obama63omf@62137@##4683ojhs', 1, '2024-09-18 18:04:51', '2024-12-19 06:55:52'),
(2, 'Stripe', 'pk_test_51JBd1uSGLTzQS8hqLy3jyNpkM5zFV6cpcAkW16ZyUoBtzzsOcjj5J8nXSfpZ4UZd1DAzFc26bRiQmYucWlA6Yb0I001Sn9bgIs', 'sk_test_51JBd1uSGLTzQS8hqzULLGzHlO8qxyn9irfOojXXhy3lvW7B2GXnNH1iRi74IM0szbmBwn3utd6Iht2mwHvJHv5WD00jkkiWb9S', 'whsec_iXNNVOAK4WDYBna79uPf11jdPiJSSD5r', 0, '2024-09-18 18:04:51', '2024-12-19 06:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `group_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'USER_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(2, 1, 'USER_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(3, 1, 'USER_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(4, 1, 'USER_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(5, 2, 'PATIENT_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(6, 2, 'PATIENT_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(7, 2, 'PATIENT_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(8, 2, 'PATIENT_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(9, 3, 'DOCTOR_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(10, 3, 'DOCTOR_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(11, 3, 'DOCTOR_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(12, 3, 'DOCTOR_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(13, 4, 'DEPARTMENT_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(14, 4, 'DEPARTMENT_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(15, 4, 'DEPARTMENT_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(16, 4, 'DEPARTMENT_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(17, 5, 'SPECIALIZATION_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(18, 5, 'SPECIALIZATION_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(19, 5, 'SPECIALIZATION_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(20, 5, 'SPECIALIZATION_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(21, 6, 'MEDICINE_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(22, 6, 'MEDICINE_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(23, 6, 'MEDICINE_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(24, 6, 'MEDICINE_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(25, 7, 'CITY_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(26, 7, 'CITY_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(27, 7, 'CITY_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(28, 7, 'CITY_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(29, 8, 'STATE_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(30, 8, 'STATE_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(31, 8, 'STATE_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(32, 8, 'STATE_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(33, 9, 'APPOINTMENT_PAYMENTS_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(34, 10, 'APPOINTMENT_INVOICE_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(35, 11, 'ALL_TRANSACTION_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(36, 11, 'ALL_TRANSACTION_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(37, 12, 'PRESCRIPTION_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(38, 12, 'PRESCRIPTION_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(39, 12, 'PRESCRIPTION_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(40, 12, 'PRESCRIPTION_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(41, 13, 'APPOINTMENT_VIEW', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(42, 13, 'APPOINTMENT_ADD', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(43, 13, 'APPOINTMENT_UPDATE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(44, 13, 'APPOINTMENT_DELETE', '2024-08-15 17:51:21', '2024-08-15 17:51:21'),
(45, 14, 'SETTING_VIEW', '2024-08-27 00:00:00', '2024-08-27 00:00:00'),
(46, 15, 'FAMILY_VIEW', NULL, NULL),
(48, 15, 'FAMILY_UPDATE', NULL, NULL),
(49, 15, 'FAMILY_ADD', '2024-08-29 00:00:00', '2024-08-29 00:00:00'),
(50, 15, 'FAMILY_DELETE', '2024-08-29 00:00:00', '2024-08-29 00:00:00'),
(55, 16, 'FILE_VIEW', '2024-10-25 16:25:59', '2024-10-25 16:25:59'),
(56, 16, 'FILE_ADD', '2024-10-25 16:25:59', '2024-10-25 16:25:59'),
(57, 16, 'FILE_UPDATE', '2024-10-25 16:25:59', '2024-10-25 16:25:59'),
(58, 16, 'FILE_DELETE', '2024-10-25 16:25:59', '2024-10-25 16:25:59'),
(59, 17, 'LOGINSCREEN_VIEW', '2024-10-25 16:27:03', '2024-10-25 16:27:03'),
(60, 17, 'LOGINSCREEN_ADD', '2024-10-25 16:27:03', '2024-10-25 16:27:03'),
(61, 17, 'LOGINSCREEN_UPDATE', '2024-10-25 16:27:03', '2024-10-25 16:27:03'),
(62, 17, 'LOGINSCREEN_DELETE', '2024-10-25 16:27:03', '2024-10-25 16:27:03'),
(63, 18, 'COUPON_VIEW', '2024-10-25 16:28:50', '2024-10-25 16:28:50'),
(64, 18, 'COUPON_ADD', '2024-10-25 16:28:50', '2024-10-25 16:28:50'),
(65, 18, 'COUPON_UPDATE', '2024-10-25 16:28:50', '2024-10-25 16:28:50'),
(66, 18, 'COUPON_DELETE', '2024-10-25 16:28:50', '2024-10-25 16:28:50'),
(67, 19, 'CHECKIN_VIEW', '2024-12-20 14:12:38', '2024-12-20 14:12:38'),
(68, 19, 'CHECKIN_ADD', '2024-12-20 14:12:38', '2024-12-20 14:12:38'),
(69, 19, 'CHECKIN_UPDATE', '2024-12-20 14:12:38', '2024-12-20 14:12:38'),
(70, 19, 'CHECKIN_DELETE', '2024-12-20 14:12:38', '2024-12-20 14:12:38'),
(75, 20, 'NOTIFICATION_VIEW', '2024-12-20 14:22:04', '2024-12-20 14:22:04'),
(76, 20, 'NOTIFICATION_ADD', '2024-12-20 14:22:04', '2024-12-20 14:22:04'),
(77, 20, 'NOTIFICATION_UPDATE', '2024-12-20 14:22:04', '2024-12-20 14:22:04'),
(78, 20, 'NOTIFICATION_DELETE', '2024-12-20 14:22:04', '2024-12-20 14:22:04'),
(79, 21, 'TESTIMONIAL_VIEW', '2024-12-20 14:24:23', '2024-12-20 14:24:23'),
(80, 21, 'TESTIMONIAL_ADD', '2024-12-20 14:24:23', '2024-12-20 14:24:23'),
(81, 21, 'TESTIMONIAL_UPDATE', '2024-12-20 14:24:23', '2024-12-20 14:24:23'),
(82, 21, 'TESTIMONIAL_DELETE', '2024-12-20 14:24:23', '2024-12-20 14:24:23'),
(83, 22, 'WALLET_VIEW', '2024-12-20 18:07:10', '2024-12-20 18:07:10'),
(84, 22, 'WALLET_ADD', '2024-12-20 18:07:10', '2024-12-20 18:07:10'),
(85, 22, 'WALLET_UPDATE', '2024-12-20 18:07:10', '2024-12-20 18:07:10'),
(86, 22, 'WALLET_DELETE', '2024-12-20 18:07:10', '2024-12-20 18:07:10');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescribe_medicines`
--

CREATE TABLE `prescribe_medicines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `test` text DEFAULT NULL,
  `advice` text DEFAULT NULL,
  `problem_desc` text DEFAULT NULL,
  `food_allergies` varchar(250) DEFAULT NULL,
  `tendency_bleed` varchar(250) DEFAULT NULL,
  `heart_disease` varchar(250) DEFAULT NULL,
  `blood_pressure` varchar(250) DEFAULT NULL,
  `diabetic` varchar(250) DEFAULT NULL,
  `surgery` varchar(250) DEFAULT NULL,
  `accident` varchar(250) DEFAULT NULL,
  `others` varchar(250) DEFAULT NULL,
  `medical_history` varchar(250) DEFAULT NULL,
  `current_medication` varchar(250) DEFAULT NULL,
  `female_pregnancy` varchar(250) DEFAULT NULL,
  `breast_feeding` varchar(250) DEFAULT NULL,
  `pulse_rate` varchar(250) DEFAULT NULL,
  `temperature` varchar(250) DEFAULT NULL,
  `next_visit` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescription_item`
--

CREATE TABLE `prescription_item` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prescription_id` bigint(20) UNSIGNED NOT NULL,
  `medicine_name` varchar(250) NOT NULL,
  `dosage` varchar(250) DEFAULT NULL,
  `duration` varchar(250) NOT NULL,
  `time` varchar(250) NOT NULL,
  `dose_interval` varchar(250) NOT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(14, 'Admin', NULL, '2024-08-15 11:26:04', '2024-08-15 11:48:07'),
(16, 'Front Desk', NULL, '2024-08-15 11:26:25', '2024-12-20 09:09:26'),
(18, 'Doctor', NULL, '2024-08-15 11:26:25', '2024-12-20 07:19:30');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1208, 14, 66, '2024-12-20 07:38:26', '2024-12-20 07:38:26'),
(2425, 16, 3, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2426, 16, 4, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2427, 16, 1, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2428, 16, 2, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2429, 16, 8, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2430, 16, 7, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2431, 16, 6, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2432, 16, 5, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2433, 16, 12, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2434, 16, 11, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2435, 16, 10, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2436, 16, 9, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2437, 16, 13, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2438, 16, 14, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2439, 16, 15, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2440, 16, 16, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2441, 16, 18, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2442, 16, 17, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2443, 16, 20, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2444, 16, 19, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2445, 16, 24, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2446, 16, 21, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2447, 16, 22, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2448, 16, 23, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2449, 16, 33, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2450, 16, 34, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2451, 16, 35, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2452, 16, 36, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2453, 16, 37, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2454, 16, 40, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2455, 16, 39, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2456, 16, 38, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2457, 16, 41, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2458, 16, 42, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2459, 16, 43, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2460, 16, 44, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2461, 16, 46, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2462, 16, 50, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2463, 16, 49, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2464, 16, 48, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2465, 16, 56, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2466, 16, 57, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2467, 16, 58, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2468, 16, 55, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2469, 16, 62, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2470, 16, 61, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2471, 16, 59, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2472, 16, 60, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2473, 16, 63, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2474, 16, 64, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2475, 16, 65, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2476, 16, 66, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2477, 16, 67, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2478, 16, 70, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2479, 16, 69, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2480, 16, 68, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2481, 16, 77, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2482, 16, 76, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2483, 16, 75, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2484, 16, 78, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2485, 16, 82, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2486, 16, 79, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2487, 16, 80, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2488, 16, 81, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2489, 16, 83, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2490, 16, 84, '2024-12-20 18:07:56', '2024-12-20 18:07:56'),
(2491, 18, 1, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2492, 18, 2, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2493, 18, 3, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2494, 18, 4, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2495, 18, 6, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2496, 18, 7, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2497, 18, 8, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2498, 18, 5, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2499, 18, 9, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2500, 18, 10, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2501, 18, 11, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2502, 18, 12, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2503, 18, 16, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2504, 18, 13, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2505, 18, 14, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2506, 18, 15, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2507, 18, 17, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2508, 18, 18, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2509, 18, 19, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2510, 18, 20, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2511, 18, 21, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2512, 18, 22, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2513, 18, 23, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2514, 18, 24, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2515, 18, 27, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2516, 18, 28, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2517, 18, 25, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2518, 18, 26, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2519, 18, 29, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2520, 18, 30, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2521, 18, 31, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2522, 18, 32, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2523, 18, 33, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2524, 18, 34, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2525, 18, 35, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2526, 18, 36, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2527, 18, 38, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2528, 18, 39, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2529, 18, 40, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2530, 18, 37, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2531, 18, 41, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2532, 18, 42, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2533, 18, 43, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2534, 18, 44, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2535, 18, 49, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2536, 18, 50, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2537, 18, 46, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2538, 18, 48, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2539, 18, 55, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2540, 18, 56, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2541, 18, 57, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2542, 18, 58, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2543, 18, 59, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2544, 18, 60, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2545, 18, 61, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2546, 18, 62, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2547, 18, 64, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2548, 18, 65, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2549, 18, 66, '2024-12-20 19:52:09', '2024-12-20 19:52:09'),
(2550, 18, 63, '2024-12-20 19:52:09', '2024-12-20 19:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `social_media`
--

CREATE TABLE `social_media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `image` text DEFAULT NULL,
  `url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_media`
--

INSERT INTO `social_media` (`id`, `title`, `image`, `url`, `created_at`, `updated_at`) VALUES
(21, 'Facebook', NULL, 'https://www.facebook.com', '2024-09-02 08:36:31', '2024-12-22 06:27:32'),
(22, 'Whatsapp', NULL, 'https://wa.link/o1a00g', '2024-09-26 19:29:44', '2024-09-26 19:29:44'),
(23, 'Twitter', NULL, 'https://twitter.com', '2024-10-15 09:06:06', '2024-10-15 09:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `specialization`
--

CREATE TABLE `specialization` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `sub_title` varchar(250) NOT NULL,
  `image` text DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doct_id` bigint(20) UNSIGNED NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `time_duration` int(11) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `wallet_amount` double DEFAULT 0,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(250) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `isd_code` varchar(6) DEFAULT NULL,
  `gender` enum('Male','Female','Other','') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `city` varchar(250) DEFAULT NULL,
  `state` varchar(250) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `isd_code_sec` varchar(6) DEFAULT NULL,
  `phone_sec` varchar(20) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `fcm` text DEFAULT NULL,
  `web_fcm` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `notification_seen_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_role_assign`
--

CREATE TABLE `users_role_assign` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_notification`
--

CREATE TABLE `user_notification` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `txn_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prescription_id` bigint(20) UNSIGNED DEFAULT NULL,
  `file_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `body` varchar(250) NOT NULL,
  `image` text DEFAULT NULL,
  `type` enum('Normal','Appointment','Transaction') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_notification`
--

INSERT INTO `user_notification` (`id`, `appointment_id`, `txn_id`, `prescription_id`, `file_id`, `user_id`, `title`, `body`, `image`, `type`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, NULL, 44, 'Appointment Confirmed!', 'Your visit with Dr. Sarah Wilson is scheduled for October 5th at 3:00 PM', NULL, NULL, '2024-10-04 05:15:23', '2024-10-01 05:15:23'),
(2, NULL, NULL, NULL, NULL, 44, 'Appointment Rescheduled!', 'Your appointment has been moved to October 7th at 11:00 AM. Please adjust your plans accordingly', NULL, NULL, '2024-09-05 05:15:55', '2024-09-05 05:15:55'),
(3, NULL, NULL, NULL, NULL, 39, 'Time to Check In!', 'Your appointment is in 30 minutes. Scan the QR code at the clinic to get your queue number', NULL, NULL, '2024-09-05 05:16:17', '2024-09-05 05:16:17'),
(4, NULL, NULL, NULL, NULL, NULL, '\"You\'re Next in Line!', 'Subtitle: \"It\'s almost your turn to see the doctor. Please be ready for your consultation with Dr. Emily Brown', NULL, NULL, '2024-09-05 05:16:43', '2024-09-05 05:16:43'),
(14, NULL, NULL, NULL, NULL, NULL, 'xxxx', 'yyyy', NULL, NULL, '2024-10-03 07:43:41', '2024-10-03 07:43:41'),
(15, NULL, NULL, NULL, NULL, NULL, 'xxxx', 'yyyy', NULL, NULL, '2024-10-03 07:44:24', '2024-10-03 07:44:24'),
(16, NULL, NULL, NULL, NULL, NULL, 'Title', 'Body', NULL, NULL, '2024-10-03 07:54:31', '2024-10-03 07:54:31'),
(17, NULL, NULL, NULL, NULL, 14, 'Title', 'Body', NULL, NULL, '2024-10-03 07:55:47', '2024-10-03 07:55:47'),
(18, NULL, NULL, NULL, NULL, 14, 'Title111', 'Body222', NULL, NULL, '2024-10-03 07:56:18', '2024-10-03 07:56:18'),
(19, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked', 'Your appointment with DoctorJames Smith on 2024-08-30 at 2024-08-30is confirmed', NULL, NULL, '2024-10-03 08:16:00', '2024-10-03 08:16:00'),
(20, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked', 'Your appointment with doctor James Smith on 30th August 2024 at 05:20 PM is confirmed', NULL, NULL, '2024-10-03 08:23:47', '2024-10-03 08:23:47'),
(21, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked!', 'Your appointment with doctor James Smith on 30th August 2024 at 05:20 PM is confirmed.', NULL, NULL, '2024-10-03 08:40:16', '2024-10-03 08:40:16'),
(22, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 30th August 2024 at 05:20 PM is confirmed.', NULL, NULL, '2024-10-03 08:42:29', '2024-10-03 08:42:29'),
(23, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 30th August 2024 at 05:20 PM is confirmed.', NULL, NULL, '2024-10-03 08:42:47', '2024-10-03 08:42:47'),
(24, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 30th August 2024 at 05:20 PM is confirmed.', NULL, NULL, '2024-10-03 10:05:09', '2024-10-03 10:05:09'),
(25, NULL, NULL, NULL, NULL, 14, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 30th August 2024 at 05:20 PM is confirmed.', NULL, NULL, '2024-10-03 10:05:25', '2024-10-03 10:05:25'),
(26, NULL, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 6th October 2024 at 10:35 AM is confirmed.', NULL, NULL, '2024-10-03 17:47:17', '2024-10-03 17:47:17'),
(27, NULL, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 6th October 2024 at 10:35 AM is confirmed.', NULL, NULL, '2024-10-03 17:47:36', '2024-10-03 17:47:36'),
(28, 199, NULL, NULL, NULL, 44, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th September 2024 at 04:50 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-10-03 18:48:10', '2024-10-03 18:48:10'),
(29, 200, NULL, NULL, NULL, 44, 'Cancellation Request Processing', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th September 2024 at 05:50 PM is currently being processed. You will receive an update once the process is complete.', NULL, NULL, '2024-10-03 18:59:55', '2024-10-03 18:59:55'),
(30, 200, NULL, NULL, NULL, 44, 'Cancellation Request Approved', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th September 2024 has been approved. The appointment is now canceled.', NULL, NULL, '2024-10-03 19:12:31', '2024-10-03 19:12:31'),
(31, 200, NULL, NULL, NULL, 44, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th September 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-10-03 19:18:19', '2024-10-03 19:18:19'),
(32, 30, NULL, NULL, NULL, 13, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor James Smith on 31st January 2024 at 10:45 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-10-16 09:49:29', '2024-10-16 09:49:29'),
(33, 30, NULL, NULL, NULL, 13, 'Cancellation Request Deleted', 'Your request to cancel the appointment with Doctor James Smith on 31st January 2024 has been deleted. Your appointment remains scheduled as planned.', NULL, NULL, '2024-10-16 09:50:50', '2024-10-16 09:50:50'),
(34, 249, NULL, NULL, NULL, 14, 'Appointment Cancelled', 'Your appointment with Dr. James Smith on 30th August 2024 at 05:20 PM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:38:11', '2024-10-16 10:38:11'),
(35, 248, NULL, NULL, NULL, 14, 'Appointment Cancelled', 'Your appointment with Dr. James Smith on 30th August 2024 at 05:20 PM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:42:15', '2024-10-16 10:42:15'),
(36, 247, NULL, NULL, NULL, 14, 'Appointment Cancelled', 'Your appointment with Dr. James Smith on 30th August 2024 at 05:20 PM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:43:29', '2024-10-16 10:43:29'),
(37, 246, NULL, NULL, NULL, 14, 'Appointment Cancelled', 'Your appointment with Dr. James Smith on 30th August 2024 at 05:20 PM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:46:16', '2024-10-16 10:46:16'),
(38, 245, NULL, NULL, NULL, 14, 'Appointment Cancelled', 'Your appointment with Dr. James Smith on 30th August 2024 at 05:20 PM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:50:03', '2024-10-16 10:50:03'),
(39, 236, NULL, NULL, NULL, 44, 'Appointment Cancelled', 'Your appointment with Dr. Emily Williams on 5th October 2024 at 08:02 AM has been successfully cancelled.', NULL, NULL, '2024-10-16 10:54:50', '2024-10-16 10:54:50'),
(40, 236, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 420 for your cancelled appointment with Dr. Emily Williams on 5th October 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-16 10:54:50', '2024-10-16 10:54:50'),
(41, 231, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment with Dr. James Smith on 1st October 2024 at 10:00 AM has been successfully rejected.', NULL, NULL, '2024-10-16 11:15:53', '2024-10-16 11:15:53'),
(42, 231, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 441 for your rejected appointment with Dr. James Smith on 1st October 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-16 11:15:53', '2024-10-16 11:15:53'),
(43, 252, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 19th October 2024 at 08:02 AM is confirmed.', NULL, NULL, '2024-10-16 11:56:19', '2024-10-16 11:56:19'),
(44, 252, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment with Dr. Emily Williams on 19th October 2024 at 08:02 AM has been successfully rejected.', NULL, NULL, '2024-10-16 11:58:12', '2024-10-16 11:58:12'),
(45, 252, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 400 for your rejected appointment with Dr. Emily Williams on 19th October 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-16 11:58:12', '2024-10-16 11:58:12'),
(46, 253, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 19th October 2024 at 08:12 AM is confirmed.', NULL, NULL, '2024-10-16 12:08:17', '2024-10-16 12:08:17'),
(47, 253, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment with Dr. Emily Williams on 19th October 2024 at 08:12 AM has been successfully rejected.', NULL, NULL, '2024-10-16 12:09:18', '2024-10-16 12:09:18'),
(48, 253, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 400 for your rejected appointment with Dr. Emily Williams on 19th October 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-16 12:09:18', '2024-10-16 12:09:18'),
(49, 254, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 19th October 2024 at 08:02 AM is confirmed.', NULL, NULL, '2024-10-16 12:13:19', '2024-10-16 12:13:19'),
(50, 254, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment with Dr. Emily Williams on 19th October 2024 at 08:02 AM has been successfully rejected.', NULL, NULL, '2024-10-16 12:13:37', '2024-10-16 12:13:37'),
(51, 254, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 400 for your rejected appointment with Dr. Emily Williams on 19th October 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-16 12:13:37', '2024-10-16 12:13:37'),
(52, 230, NULL, NULL, NULL, 44, 'Appointment Marked as Pending', 'Your appointment request with Dr. Jessica Taylor on 29th September 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-10-16 18:04:20', '2024-10-16 18:04:20'),
(53, 230, NULL, NULL, NULL, 44, 'Appointment Completed', 'Your appointment with Dr. Jessica Taylor on 29th September 2024 at 12:10 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-10-16 18:05:21', '2024-10-16 18:05:21'),
(54, 230, NULL, NULL, NULL, 44, 'Appointment Completed', 'Your appointment with Dr. Jessica Taylor on 29th September 2024 has been marked as completed. We hope your visit went well.', NULL, NULL, '2024-10-16 18:07:30', '2024-10-16 18:07:30'),
(55, 230, NULL, NULL, NULL, 44, 'Appointment Visited', 'Your appointment with Dr. Jessica Taylor on 29th September 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-10-16 18:08:03', '2024-10-16 18:08:03'),
(56, 230, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment request with Dr. Jessica Taylor on 29th September 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-10-16 18:32:34', '2024-10-16 18:32:34'),
(57, 229, NULL, NULL, NULL, 44, 'Appointment Rescheduled', 'Your appointment with Dr. Jessica Taylor on 26th September 2024 at 10:23 AM has been rescheduled to 17th October 2024 at 03:05 PM. Please review the new schedule and contact us if you have any questions.', NULL, NULL, '2024-10-16 18:40:01', '2024-10-16 18:40:01'),
(58, NULL, 372, NULL, NULL, 44, 'Wallet Credited', 'An amount of 2000 has been credited to your wallet.', NULL, NULL, '2024-10-17 07:09:28', '2024-10-17 07:09:28'),
(59, NULL, 374, NULL, NULL, 44, 'Wallet Debited', 'An amount of 2000 has been debited to your wallet.', NULL, NULL, '2024-10-17 07:10:12', '2024-10-17 07:10:12'),
(60, 5, NULL, NULL, NULL, 13, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 1st January 2024.', NULL, NULL, '2024-10-17 07:18:22', '2024-10-17 07:18:22'),
(61, 229, NULL, NULL, NULL, 44, 'New Prescription Added!', 'A new prescription has been added by Dr. Jessica Taylor for your recent visit on 17th October 2024.', NULL, NULL, '2024-10-17 07:18:54', '2024-10-17 07:18:54'),
(62, 229, NULL, NULL, NULL, 44, 'New Prescription Added!', 'A new prescription has been added by Dr. Jessica Taylor for your recent visit on 17th October 2024.', NULL, NULL, '2024-10-17 07:20:07', '2024-10-17 07:20:07'),
(63, 229, NULL, NULL, NULL, 44, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-10-17 07:28:42', '2024-10-17 07:28:42'),
(64, 229, NULL, 54, NULL, 44, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-10-17 07:50:29', '2024-10-17 07:50:29'),
(65, 5, NULL, 57, NULL, 13, 'Prescription Deleted', 'Your prescription from Dr. James Smith has been deleted.', NULL, NULL, '2024-10-17 08:17:34', '2024-10-17 08:17:34'),
(66, 243, NULL, NULL, NULL, 14, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 19th October 2024.. Please wait for your turn.', NULL, NULL, '2024-10-17 08:42:09', '2024-10-17 08:42:09'),
(67, 243, NULL, NULL, NULL, 14, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 19th October 2024.. Please wait for your turn.', NULL, NULL, '2024-10-17 08:55:33', '2024-10-17 08:55:33'),
(68, 243, NULL, NULL, NULL, 14, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 19th October 2024.. Please wait for your turn.', NULL, NULL, '2024-10-17 08:56:59', '2024-10-17 08:56:59'),
(69, 243, NULL, NULL, NULL, 14, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 19th October 2024.. Please wait for your turn.', NULL, NULL, '2024-10-17 08:58:31', '2024-10-17 08:58:31'),
(70, 243, NULL, NULL, NULL, 14, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 30th August 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-10-17 08:58:41', '2024-10-17 08:58:41'),
(71, 259, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 18th October 2024 at 11:28 AM is confirmed.', NULL, NULL, '2024-10-18 05:57:34', '2024-10-18 05:57:34'),
(72, 260, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 26th October 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-10-24 12:20:26', '2024-10-24 12:20:26'),
(73, NULL, 379, NULL, NULL, 36, 'Wallet Credited', 'An amount of 2000.00 has been credited to your wallet.', NULL, NULL, '2024-10-24 12:23:11', '2024-10-24 12:23:11'),
(74, NULL, NULL, NULL, 10, 44, 'Patient File xray Report Added Successfully', 'A new file, xray Report has been added for Ashish Khre. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:11:20', '2024-10-26 12:11:20'),
(75, NULL, NULL, NULL, 11, 44, 'Patient File xray Report Added Successfully', 'A new file, xray Report has been added for Ashish Khre. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:12:18', '2024-10-26 12:12:18'),
(76, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:17:02', '2024-10-26 12:17:02'),
(77, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:18:01', '2024-10-26 12:18:01'),
(78, NULL, NULL, NULL, 11, 44, 'Patient File xxxxxffff Updated Successfully', 'xxxxxffff has been Updated for Ashish Khre. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:21:00', '2024-10-26 12:21:00'),
(79, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:21:37', '2024-10-26 12:21:37'),
(80, NULL, NULL, NULL, 12, 44, 'Patient File xray Report Added Successfully', 'A new file, xray Report has been added for Ashish Khre. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:22:38', '2024-10-26 12:22:38'),
(81, NULL, NULL, NULL, 6, 44, 'Patient File xxxxxffff Updated Successfully', 'xxxxxffff has been Updated for Ashish Khre. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:22:44', '2024-10-26 12:22:44'),
(82, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:22:57', '2024-10-26 12:22:57'),
(83, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:26:04', '2024-10-26 12:26:04'),
(84, 260, NULL, 61, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 26th October 2024.', NULL, NULL, '2024-10-26 12:28:27', '2024-10-26 12:28:27'),
(85, 260, NULL, 61, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:40:38', '2024-10-26 12:40:38'),
(86, 5, NULL, 58, NULL, 13, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-26 12:42:08', '2024-10-26 12:42:08'),
(87, NULL, NULL, NULL, 13, 13, 'Patient File ggg Added Successfully', 'A new file, ggg has been added for Ashish Khae. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-26 12:57:31', '2024-10-26 12:57:31'),
(88, 173, NULL, 44, NULL, 14, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-10-29 08:56:40', '2024-10-29 08:56:40'),
(89, 213, NULL, 23, NULL, 44, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-10-29 08:59:03', '2024-10-29 08:59:03'),
(90, 213, NULL, 23, NULL, 44, 'Prescription Deleted', 'Your prescription from Dr. Jessica Taylor has been deleted.', NULL, NULL, '2024-10-29 09:11:37', '2024-10-29 09:11:37'),
(91, 261, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:25 AM is confirmed.', NULL, NULL, '2024-10-30 07:24:53', '2024-10-30 07:24:53'),
(92, 262, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:26 AM is confirmed.', NULL, NULL, '2024-10-30 07:30:57', '2024-10-30 07:30:57'),
(93, 263, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:27 AM is confirmed.', NULL, NULL, '2024-10-30 07:33:41', '2024-10-30 07:33:41'),
(94, 264, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:28 AM is confirmed.', NULL, NULL, '2024-10-30 07:49:10', '2024-10-30 07:49:10'),
(95, 265, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:29 AM is confirmed.', NULL, NULL, '2024-10-30 07:50:04', '2024-10-30 07:50:04'),
(96, NULL, 384, NULL, NULL, 61, 'Wallet Credited', 'An amount of 500 has been credited to your wallet.', NULL, NULL, '2024-10-30 08:39:23', '2024-10-30 08:39:23'),
(97, 266, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:22 AM is confirmed.', NULL, NULL, '2024-10-30 08:41:00', '2024-10-30 08:41:00'),
(98, 265, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 30th October 2024.. Please wait for your turn.', NULL, NULL, '2024-10-30 12:39:35', '2024-10-30 12:39:35'),
(99, 266, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 1st November 2024.. Please wait for your turn.', NULL, NULL, '2024-10-30 12:59:40', '2024-10-30 12:59:40'),
(100, 261, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 1st November 2024.. Please wait for your turn.', NULL, NULL, '2024-10-30 13:00:02', '2024-10-30 13:00:02'),
(101, 265, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 1st November 2024.. Please wait for your turn.', NULL, NULL, '2024-10-30 13:00:16', '2024-10-30 13:00:16'),
(102, 265, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 1st November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-10-30 13:02:56', '2024-10-30 13:02:56'),
(103, 261, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 1st November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-10-30 13:03:06', '2024-10-30 13:03:06'),
(104, 266, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 1st November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-10-30 13:03:09', '2024-10-30 13:03:09'),
(105, 261, NULL, NULL, NULL, 61, 'Appointment Visited', 'Your appointment with Dr. James Smith on 1st November 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-10-30 13:08:22', '2024-10-30 13:08:22'),
(106, 261, NULL, 62, NULL, 61, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 1st November 2024.', NULL, NULL, '2024-10-30 13:11:23', '2024-10-30 13:11:23'),
(107, 261, NULL, 63, NULL, 61, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 1st November 2024.', NULL, NULL, '2024-10-30 13:12:54', '2024-10-30 13:12:54'),
(108, 261, NULL, 63, NULL, 61, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-30 13:19:29', '2024-10-30 13:19:29'),
(109, 261, NULL, 63, NULL, 61, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-10-30 13:21:44', '2024-10-30 13:21:44'),
(110, NULL, NULL, NULL, 14, 61, 'Patient File xRay Report Added Successfully', 'A new file, xRay Report has been added for Vinesh Verma. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-30 13:23:10', '2024-10-30 13:23:10'),
(111, NULL, NULL, NULL, 14, 61, 'Patient File xRay Reportrrrr Updated Successfully', 'xRay Reportrrrr has been Updated for Vinesh Verma. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-30 13:24:44', '2024-10-30 13:24:44'),
(112, NULL, NULL, NULL, 15, 61, 'Patient File Xray Report Added Successfully', 'A new file, Xray Report has been added for Vinesh Verma. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-30 13:25:17', '2024-10-30 13:25:17'),
(113, NULL, NULL, NULL, 16, 61, 'Patient File DNA Report Added Successfully', 'A new file, DNA Report has been added for Rupesh Verma. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-10-30 13:49:25', '2024-10-30 13:49:25'),
(114, 267, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 4th November 2024 at 08:10 AM is confirmed.', NULL, NULL, '2024-10-30 14:31:24', '2024-10-30 14:31:24'),
(115, 267, NULL, NULL, NULL, 61, 'Appointment Completed', 'Your appointment with Dr. James Smith on 4th November 2024 has been marked as completed. We hope your visit went well.', NULL, NULL, '2024-10-30 14:35:55', '2024-10-30 14:35:55'),
(116, 268, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 4th November 2024 at 08:50 AM is confirmed.', NULL, NULL, '2024-10-30 14:38:46', '2024-10-30 14:38:46'),
(117, 268, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor James Smith on 4th November 2024 at 08:50 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-10-31 06:14:57', '2024-10-31 06:14:57'),
(118, 268, NULL, NULL, NULL, 61, 'Cancellation Request Processing', 'Your request to cancel the appointment with Doctor James Smith on 4th November 2024 at 08:50 AM is currently being processed. You will receive an update once the process is complete.', NULL, NULL, '2024-10-31 06:15:52', '2024-10-31 06:15:52'),
(119, 268, NULL, NULL, NULL, 61, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. James Smith on 4th November 2024 at 08:50 AM has been successfully cancelled.', NULL, NULL, '2024-10-31 06:18:55', '2024-10-31 06:18:55'),
(120, 268, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 472.5 for your cancelled appointment with Dr. James Smith on 4th November 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-31 06:18:55', '2024-10-31 06:18:55'),
(121, 265, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor James Smith on 1st November 2024 at 10:29 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-10-31 06:20:46', '2024-10-31 06:20:46'),
(122, 265, NULL, NULL, NULL, 61, 'Cancellation Request Processing', 'Your request to cancel the appointment with Doctor James Smith on 1st November 2024 at 10:29 AM is currently being processed. You will receive an update once the process is complete.', NULL, NULL, '2024-10-31 06:21:01', '2024-10-31 06:21:01'),
(123, 265, NULL, NULL, NULL, 61, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor James Smith on 1st November 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-10-31 06:21:06', '2024-10-31 06:21:06'),
(124, 262, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor James Smith on 1st November 2024 at 10:26 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-10-31 06:23:33', '2024-10-31 06:23:33'),
(125, 262, NULL, NULL, NULL, 61, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:26 AM has been successfully cancelled.', NULL, NULL, '2024-10-31 06:23:51', '2024-10-31 06:23:51'),
(126, 266, NULL, NULL, NULL, 61, 'Appointment Marked as Pending', 'Your appointment request with Dr. James Smith on 1st November 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-10-31 07:49:34', '2024-10-31 07:49:34'),
(127, 266, NULL, NULL, NULL, 61, 'Appointment Confirmed', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:22 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-10-31 07:49:48', '2024-10-31 07:49:48'),
(128, 265, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:29 AM has been successfully rejected.', NULL, NULL, '2024-10-31 07:53:08', '2024-10-31 07:53:08'),
(129, 265, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 357 for your rejected appointment with Dr. James Smith on 1st November 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-31 07:53:08', '2024-10-31 07:53:08'),
(130, 269, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:29 AM is confirmed.', NULL, NULL, '2024-10-31 07:54:08', '2024-10-31 07:54:08'),
(131, 269, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:29 AM has been successfully rejected.', NULL, NULL, '2024-10-31 07:57:10', '2024-10-31 07:57:10'),
(132, 266, NULL, NULL, NULL, 61, 'Appointment Rescheduled', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:22 AM has been rescheduled to 2nd November 2024 at 12:45 PM. Please review the new schedule and contact us if you have any questions.', NULL, NULL, '2024-10-31 08:00:00', '2024-10-31 08:00:00'),
(133, 266, NULL, NULL, NULL, 61, 'Appointment Confirmed', 'Your appointment with Dr. James Smith on 2nd November 2024 at 12:45 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-10-31 08:00:22', '2024-10-31 08:00:22'),
(134, 271, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 31st October 2024 at 10:32 AM is confirmed.', NULL, NULL, '2024-10-31 08:16:52', '2024-10-31 08:16:52'),
(135, 271, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment request with Dr. James Smith on 31st October 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-10-31 08:17:51', '2024-10-31 08:17:51'),
(136, 272, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 2nd November 2024 at 11:05 AM is confirmed.', NULL, NULL, '2024-10-31 08:21:16', '2024-10-31 08:21:16'),
(137, 272, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment request with Dr. James Smith on 2nd November 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-10-31 08:21:49', '2024-10-31 08:21:49'),
(138, 273, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:26 AM is confirmed.', NULL, NULL, '2024-10-31 08:23:06', '2024-10-31 08:23:06'),
(139, 273, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment request with Dr. James Smith on 1st November 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-10-31 08:23:14', '2024-10-31 08:23:14'),
(140, 274, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 1st November 2024 at 10:01 AM is confirmed.', NULL, NULL, '2024-10-31 08:27:50', '2024-10-31 08:27:50'),
(141, 274, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment with Dr. James Smith on 1st November 2024 at 10:01 AM has been successfully rejected.', NULL, NULL, '2024-10-31 08:28:51', '2024-10-31 08:28:51'),
(142, 274, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 472.5 for your rejected appointment with Dr. James Smith on 1st November 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-31 08:28:51', '2024-10-31 08:28:51'),
(143, 275, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 4th November 2024 at 08:20 AM is confirmed.', NULL, NULL, '2024-10-31 09:15:50', '2024-10-31 09:15:50'),
(144, 275, NULL, NULL, NULL, 61, 'Appointment Marked as Pending', 'Your appointment request with Dr. James Smith on 4th November 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-10-31 09:17:51', '2024-10-31 09:17:51'),
(145, 275, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment with Dr. James Smith on 4th November 2024 at 08:20 AM has been successfully rejected.', NULL, NULL, '2024-10-31 09:18:03', '2024-10-31 09:18:03'),
(146, 275, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 472.5 for your rejected appointment with Dr. James Smith on 4th November 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-10-31 09:18:03', '2024-10-31 09:18:03'),
(147, 276, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 5th November 2024 at 12:00 PM is confirmed.', NULL, NULL, '2024-10-31 09:18:38', '2024-10-31 09:18:38'),
(148, 276, NULL, NULL, NULL, 61, 'Appointment Marked as Pending', 'Your appointment request with Dr. James Smith on 5th November 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-10-31 09:18:47', '2024-10-31 09:18:47'),
(149, 276, NULL, NULL, NULL, 61, 'Appointment Rejected', 'Your appointment request with Dr. James Smith on 5th November 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-10-31 09:19:00', '2024-10-31 09:19:00'),
(150, 277, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 2nd November 2024 at 11:05 AM is confirmed.', NULL, NULL, '2024-11-01 06:14:25', '2024-11-01 06:14:25'),
(151, 225, NULL, NULL, NULL, 44, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 21st September 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 07:57:31', '2024-11-05 07:57:31'),
(152, 261, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 1st November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 07:57:35', '2024-11-05 07:57:35'),
(153, 250, NULL, NULL, NULL, 44, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. Emily Williams on 12th October 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 07:57:38', '2024-11-05 07:57:38'),
(154, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:03:24', '2024-11-05 08:03:24'),
(155, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:03:27', '2024-11-05 08:03:27'),
(156, 277, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 5th November 2024.. Please wait for your turn.', NULL, NULL, '2024-11-05 08:03:56', '2024-11-05 08:03:56'),
(157, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:04:49', '2024-11-05 08:04:49'),
(158, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:05:52', '2024-11-05 08:05:52'),
(159, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:07:20', '2024-11-05 08:07:20'),
(160, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-05 08:08:07', '2024-11-05 08:08:07'),
(161, 277, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 5th November 2024.. Please wait for your turn.', NULL, NULL, '2024-11-05 08:08:11', '2024-11-05 08:08:11'),
(162, 260, NULL, NULL, NULL, 36, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 26th October 2024.. Please wait for your turn.', NULL, NULL, '2024-11-05 08:13:37', '2024-11-05 08:13:37'),
(163, 261, NULL, 63, NULL, 61, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-11-07 05:43:23', '2024-11-07 05:43:23'),
(164, 261, NULL, 63, NULL, 61, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-11-07 05:43:29', '2024-11-07 05:43:29'),
(165, 260, NULL, NULL, NULL, 36, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 26th October 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-07 14:30:21', '2024-11-07 14:30:21'),
(166, 260, NULL, NULL, NULL, 36, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. James Smith on 7th November 2024.. Please wait for your turn.', NULL, NULL, '2024-11-07 14:31:38', '2024-11-07 14:31:38'),
(167, NULL, 400, NULL, NULL, 36, 'Wallet Credited', 'An amount of 5000 has been credited to your wallet.', NULL, NULL, '2024-11-07 15:48:29', '2024-11-07 15:48:29'),
(168, NULL, 401, NULL, NULL, 36, 'Wallet Credited', 'An amount of 1500.00 has been credited to your wallet.', NULL, NULL, '2024-11-07 15:51:16', '2024-11-07 15:51:16'),
(169, 199, NULL, NULL, NULL, 44, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 at 04:50 PM has been successfully cancelled.', NULL, NULL, '2024-11-07 16:21:17', '2024-11-07 16:21:17'),
(170, 199, NULL, NULL, NULL, 44, 'Refund Processed', 'The amount of 420 for your cancelled appointment with Dr. Jessica Taylor on 15th September 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-11-07 16:21:17', '2024-11-07 16:21:17'),
(171, 278, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 12th November 2024 at 11:00 AM is confirmed.', NULL, NULL, '2024-11-08 03:01:13', '2024-11-08 03:01:13'),
(172, 279, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 8th November 2024 at 08:40 AM is confirmed.', NULL, NULL, '2024-11-08 03:10:54', '2024-11-08 03:10:54'),
(173, 280, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 8th November 2024 at 08:45 AM is confirmed.', NULL, NULL, '2024-11-08 03:15:39', '2024-11-08 03:15:39'),
(174, 279, NULL, NULL, NULL, 44, 'Appointment Rejected', 'Your appointment request with Dr. Emily Williams on 8th November 2024 has been rejected. Please try booking another slot or contact the clinic.', NULL, NULL, '2024-11-08 03:16:00', '2024-11-08 03:16:00'),
(175, 196, NULL, NULL, NULL, 44, 'Appointment Confirmed', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 at 02:40 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 03:49:24', '2024-11-08 03:49:24'),
(176, 196, NULL, NULL, NULL, 44, 'Appointment Marked as Pending', 'Your appointment request with Dr. Jessica Taylor on 15th September 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-11-08 03:49:27', '2024-11-08 03:49:27'),
(177, 196, NULL, NULL, NULL, 44, 'Appointment Confirmed', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 at 02:40 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 03:49:31', '2024-11-08 03:49:31'),
(178, 196, NULL, NULL, NULL, 44, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th September 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-11-08 03:52:13', '2024-11-08 03:52:13'),
(179, 196, NULL, NULL, NULL, 44, 'Appointment Marked as Pending', 'Your appointment request with Dr. Jessica Taylor on 15th September 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-11-08 03:52:17', '2024-11-08 03:52:17'),
(180, 196, NULL, NULL, NULL, 44, 'Appointment Confirmed', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 at 02:40 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 03:52:20', '2024-11-08 03:52:20'),
(181, 196, NULL, NULL, NULL, 44, 'Appointment Visited', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-11-08 03:52:25', '2024-11-08 03:52:25'),
(182, 196, NULL, NULL, NULL, 44, 'Appointment Confirmed', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 at 02:40 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 03:52:31', '2024-11-08 03:52:31'),
(183, 196, NULL, NULL, NULL, 44, 'Appointment Visited', 'Your appointment with Dr. Jessica Taylor on 15th September 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-11-08 03:52:36', '2024-11-08 03:52:36'),
(184, 281, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 10th November 2024 at 12:00 PM is confirmed.', NULL, NULL, '2024-11-08 04:52:58', '2024-11-08 04:52:58'),
(185, 281, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 10th November 2024 at 12:00 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-11-08 04:57:37', '2024-11-08 04:57:37'),
(186, 281, NULL, NULL, NULL, 61, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. Emily Williams on 10th November 2024 at 12:00 PM has been successfully cancelled.', NULL, NULL, '2024-11-08 04:58:06', '2024-11-08 04:58:06'),
(187, 281, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 525 for your cancelled appointment with Dr. Emily Williams on 10th November 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-11-08 04:58:06', '2024-11-08 04:58:06'),
(188, 282, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 10th November 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-11-08 09:30:54', '2024-11-08 09:30:54'),
(189, 283, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 10th November 2024 at 10:10 AM is confirmed.', NULL, NULL, '2024-11-08 09:41:45', '2024-11-08 09:41:45'),
(190, 284, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 10th November 2024 at 10:20 AM is confirmed.', NULL, NULL, '2024-11-08 10:18:47', '2024-11-08 10:18:47'),
(191, 278, NULL, NULL, NULL, 36, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 12th November 2024 at 11:00 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-11-08 11:02:42', '2024-11-08 11:02:42'),
(192, 278, NULL, NULL, NULL, 36, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor Emily Williams on 12th November 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-11-08 11:12:08', '2024-11-08 11:12:08'),
(193, 278, NULL, NULL, NULL, 36, 'Appointment Confirmed', 'Your appointment with Dr. Emily Williams on 12th November 2024 at 11:00 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 11:12:23', '2024-11-08 11:12:23'),
(194, 278, NULL, NULL, NULL, 36, 'Appointment Completed', 'Your appointment with Dr. Emily Williams on 12th November 2024 has been marked as completed. We hope your visit went well.', NULL, NULL, '2024-11-08 11:12:27', '2024-11-08 11:12:27'),
(195, 278, NULL, NULL, NULL, 36, 'Appointment Confirmed', 'Your appointment with Dr. Emily Williams on 12th November 2024 at 11:00 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-11-08 11:12:32', '2024-11-08 11:12:32'),
(196, NULL, 411, NULL, NULL, 61, 'Wallet Credited', 'An amount of 470 has been credited to your wallet.', NULL, NULL, '2024-11-10 04:16:45', '2024-11-10 04:16:45'),
(197, NULL, 412, NULL, NULL, 36, 'Wallet Credited', 'An amount of 500 has been credited to your wallet.', NULL, NULL, '2024-11-10 04:17:28', '2024-11-10 04:17:28'),
(198, 260, NULL, NULL, NULL, 36, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 26th October 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-16 13:07:12', '2024-11-16 13:07:12'),
(199, 277, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. James Smith on 2nd November 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-11-16 13:07:14', '2024-11-16 13:07:14'),
(200, NULL, NULL, NULL, 18, 36, 'Patient File Blood test report Added Successfully', 'A new file, Blood test report has been added for Rishabhssss Bose. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-11-18 08:28:39', '2024-11-18 08:28:39'),
(201, 285, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 25th November 2024 at 02:03 AM is confirmed.', NULL, NULL, '2024-11-25 08:33:21', '2024-11-25 08:33:21'),
(202, 286, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Jessica Taylor on 1st December 2024 at 10:20 AM is confirmed.', NULL, NULL, '2024-11-30 09:33:14', '2024-11-30 09:33:14'),
(203, NULL, 413, NULL, NULL, 36, 'Wallet Credited', 'An amount of 2000.00 has been credited to your wallet.', NULL, NULL, '2024-12-04 05:51:18', '2024-12-04 05:51:18'),
(204, 286, NULL, NULL, NULL, 61, 'Appointment Confirmed', 'Your appointment with Dr. Jessica Taylor on 1st December 2024 at 10:20 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-12-12 06:52:07', '2024-12-12 06:52:07'),
(205, 287, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Jessica Taylor on 15th December 2024 at 10:10 AM is confirmed.', NULL, NULL, '2024-12-12 10:42:58', '2024-12-12 10:42:58'),
(206, 288, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 13th December 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-12-12 10:43:13', '2024-12-12 10:43:13'),
(207, 289, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 16th December 2024 at 08:00 AM is confirmed.', NULL, NULL, '2024-12-12 10:47:56', '2024-12-12 10:47:56'),
(208, 278, NULL, NULL, NULL, 36, 'Appointment Marked as Pending', 'Your appointment request with Dr. Emily Williams on 12th November 2024 has been marked as pending. We will notify you once it\'s confirmed.', NULL, NULL, '2024-12-12 10:52:45', '2024-12-12 10:52:45'),
(209, 278, NULL, NULL, NULL, 36, 'Appointment Completed', 'Your appointment with Dr. Emily Williams on 12th November 2024 has been marked as completed. We hope your visit went well.', NULL, NULL, '2024-12-12 10:52:49', '2024-12-12 10:52:49'),
(210, 287, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Jessica Taylor on 15th December 2024 at 10:10 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-12 11:04:30', '2024-12-12 11:04:30'),
(211, 173, NULL, 44, NULL, 14, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:15:16', '2024-12-12 11:15:16'),
(212, 173, NULL, 65, NULL, 14, 'New Prescription Added!', 'A new prescription has been added by Dr. Jessica Taylor for your recent visit on 19th August 2024.', NULL, NULL, '2024-12-12 11:32:23', '2024-12-12 11:32:23'),
(213, 173, NULL, 65, NULL, 14, 'Prescription Updated', 'Your prescription from Dr. Jessica Taylor has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:34:51', '2024-12-12 11:34:51'),
(214, 289, NULL, 66, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 16th December 2024.', NULL, NULL, '2024-12-12 11:41:51', '2024-12-12 11:41:51'),
(215, 289, NULL, 67, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 16th December 2024.', NULL, NULL, '2024-12-12 11:45:32', '2024-12-12 11:45:32'),
(216, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:45:42', '2024-12-12 11:45:42'),
(217, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:46:54', '2024-12-12 11:46:54'),
(218, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:48:13', '2024-12-12 11:48:13'),
(219, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:50:47', '2024-12-12 11:50:47'),
(220, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:51:02', '2024-12-12 11:51:02'),
(221, 289, NULL, 67, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:51:27', '2024-12-12 11:51:27');
INSERT INTO `user_notification` (`id`, `appointment_id`, `txn_id`, `prescription_id`, `file_id`, `user_id`, `title`, `body`, `image`, `type`, `created_at`, `updated_at`) VALUES
(222, 289, NULL, 66, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-12 11:52:47', '2024-12-12 11:52:47'),
(223, 289, NULL, 68, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 16th December 2024.', NULL, NULL, '2024-12-12 12:02:44', '2024-12-12 12:02:44'),
(224, 290, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 13th December 2024 at 10:06 AM is confirmed.', NULL, NULL, '2024-12-13 08:18:57', '2024-12-13 08:18:57'),
(225, 291, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 14th December 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-12-13 16:13:10', '2024-12-13 16:13:10'),
(226, 289, NULL, 68, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-13 18:52:44', '2024-12-13 18:52:44'),
(227, 292, NULL, NULL, NULL, 44, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 17th December 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-12-14 09:49:12', '2024-12-14 09:49:12'),
(228, 293, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor James Smith on 17th December 2024 at 10:15 AM is confirmed.', NULL, NULL, '2024-12-14 09:52:44', '2024-12-14 09:52:44'),
(229, 293, NULL, NULL, NULL, 36, 'Appointment Confirmed', 'Your appointment with Dr. James Smith on 17th December 2024 at 10:15 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-12-14 10:29:54', '2024-12-14 10:29:54'),
(230, 293, NULL, NULL, NULL, 36, 'Appointment Rescheduled', 'Your appointment with Dr. James Smith on 17th December 2024 at 10:15 AM has been rescheduled to 14th December 2024 at 10:05 AM. Please review the new schedule and contact us if you have any questions.', NULL, NULL, '2024-12-14 10:30:03', '2024-12-14 10:30:03'),
(231, 293, NULL, NULL, NULL, 36, 'Appointment Visited', 'Your appointment with Dr. James Smith on 14th December 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-12-14 10:30:14', '2024-12-14 10:30:14'),
(232, 293, NULL, 69, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 14th December 2024.', NULL, NULL, '2024-12-14 10:34:25', '2024-12-14 10:34:25'),
(233, 293, NULL, 70, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. James Smith for your recent visit on 14th December 2024.', NULL, NULL, '2024-12-14 10:39:33', '2024-12-14 10:39:33'),
(234, 293, NULL, 70, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-14 10:40:05', '2024-12-14 10:40:05'),
(235, NULL, NULL, NULL, 20, 36, 'Patient File Blood Test Added Successfully', 'A new file, Blood Test has been added for Rishabhssss Bose. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-12-14 10:42:22', '2024-12-14 10:42:22'),
(236, NULL, NULL, NULL, 20, 36, 'Patient File Blood Test Updated Successfully', 'Blood Test has been Updated for Rishabhssss Bose. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-12-14 10:42:34', '2024-12-14 10:42:34'),
(237, 294, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 12:50 PM is confirmed.', NULL, NULL, '2024-12-17 06:22:16', '2024-12-17 06:22:16'),
(238, 294, NULL, NULL, NULL, 36, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 06:23:28', '2024-12-17 06:23:28'),
(239, 295, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 04:20 PM is confirmed.', NULL, NULL, '2024-12-17 06:24:03', '2024-12-17 06:24:03'),
(240, 295, NULL, NULL, NULL, 36, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 06:24:40', '2024-12-17 06:24:40'),
(241, 295, NULL, NULL, NULL, 36, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 17th December 2024 at 04:20 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-17 06:26:09', '2024-12-17 06:26:09'),
(242, 295, NULL, NULL, NULL, 36, 'Cancellation Request Processing', 'Your request to cancel the appointment with Doctor Emily Williams on 17th December 2024 at 04:20 PM is currently being processed. You will receive an update once the process is complete.', NULL, NULL, '2024-12-17 06:26:37', '2024-12-17 06:26:37'),
(243, 295, NULL, NULL, NULL, 36, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor Emily Williams on 17th December 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-12-17 06:26:54', '2024-12-17 06:26:54'),
(244, 295, NULL, NULL, NULL, 36, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. Emily Williams on 17th December 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-12-17 06:30:01', '2024-12-17 06:30:01'),
(245, 294, NULL, NULL, NULL, 36, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. Emily Williams on 17th December 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-12-17 06:30:06', '2024-12-17 06:30:06'),
(246, 294, NULL, NULL, NULL, 36, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 06:32:05', '2024-12-17 06:32:05'),
(247, 295, NULL, NULL, NULL, 36, 'Appointment Confirmed', 'Your appointment with Dr. Emily Williams on 17th December 2024 at 04:20 PM has been confirmed. Please arrive on time.', NULL, NULL, '2024-12-17 06:49:31', '2024-12-17 06:49:31'),
(248, 294, NULL, NULL, NULL, 36, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 17th December 2024 at 12:50 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-17 06:50:44', '2024-12-17 06:50:44'),
(249, 294, NULL, NULL, NULL, 36, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. Emily Williams on 17th December 2024 at 12:50 PM has been successfully cancelled.', NULL, NULL, '2024-12-17 06:50:52', '2024-12-17 06:50:52'),
(250, 294, NULL, NULL, NULL, 36, 'Refund Processed', 'The amount of 420 for your cancelled appointment with Dr. Emily Williams on 17th December 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-12-17 06:50:52', '2024-12-17 06:50:52'),
(251, NULL, 422, NULL, NULL, 36, 'Wallet Credited', 'An amount of 1000.00 has been credited to your wallet.', NULL, NULL, '2024-12-17 07:03:39', '2024-12-17 07:03:39'),
(252, 296, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 04:30 PM is confirmed.', NULL, NULL, '2024-12-17 07:36:19', '2024-12-17 07:36:19'),
(253, 297, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 04:40 PM is confirmed.', NULL, NULL, '2024-12-17 08:10:30', '2024-12-17 08:10:30'),
(254, NULL, 425, NULL, NULL, 61, 'Wallet Credited', 'An amount of 555.00 has been credited to your wallet.', NULL, NULL, '2024-12-17 08:11:11', '2024-12-17 08:11:11'),
(255, 296, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 08:19:50', '2024-12-17 08:19:50'),
(256, 296, NULL, NULL, NULL, 61, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. Emily Williams on 17th December 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-12-17 08:20:35', '2024-12-17 08:20:35'),
(257, 296, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 08:20:55', '2024-12-17 08:20:55'),
(258, 297, NULL, NULL, NULL, 61, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 17th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-17 08:21:33', '2024-12-17 08:21:33'),
(259, 297, NULL, NULL, NULL, 61, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 17th December 2024 at 04:40 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-17 08:23:39', '2024-12-17 08:23:39'),
(260, 297, NULL, NULL, NULL, 61, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. Emily Williams on 17th December 2024 at 04:40 PM has been successfully cancelled.', NULL, NULL, '2024-12-17 08:24:08', '2024-12-17 08:24:08'),
(261, 297, NULL, NULL, NULL, 61, 'Refund Processed', 'The amount of 420 for your cancelled appointment with Dr. Emily Williams on 17th December 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-12-17 08:24:08', '2024-12-17 08:24:08'),
(262, 298, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 03:00 PM is confirmed.', NULL, NULL, '2024-12-17 09:10:45', '2024-12-17 09:10:45'),
(263, 299, NULL, NULL, NULL, 61, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 17th December 2024 at 03:20 PM is confirmed.', NULL, NULL, '2024-12-17 09:44:21', '2024-12-17 09:44:21'),
(264, NULL, NULL, NULL, NULL, NULL, 'test notificatin from admin', 'ttt', 'notification/2024-12-18-6762e0476125a.png', NULL, '2024-12-18 14:46:31', '2024-12-18 14:46:31'),
(265, NULL, 429, NULL, NULL, 72, 'Wallet Credited', 'An amount of 2000 has been credited to your wallet.', NULL, NULL, '2024-12-19 06:53:29', '2024-12-19 06:53:29'),
(266, 300, NULL, NULL, NULL, 72, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 21st December 2024 at 08:02 AM is confirmed.', NULL, NULL, '2024-12-19 06:56:36', '2024-12-19 06:56:36'),
(267, 300, NULL, NULL, NULL, 72, 'Appointment Rescheduled', 'Your appointment with Dr. Emily Williams on 21st December 2024 at 08:02 AM has been rescheduled to 23rd December 2024 at 09:55 AM. Please review the new schedule and contact us if you have any questions.', NULL, NULL, '2024-12-19 07:03:00', '2024-12-19 07:03:00'),
(268, 300, NULL, NULL, NULL, 72, 'Appointment Confirmed', 'Your appointment with Dr. Emily Williams on 23rd December 2024 at 09:55 AM has been confirmed. Please arrive on time.', NULL, NULL, '2024-12-19 07:03:08', '2024-12-19 07:03:08'),
(269, 301, NULL, NULL, NULL, 72, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 19th December 2024 at 01:00 PM is confirmed.', NULL, NULL, '2024-12-19 07:11:51', '2024-12-19 07:11:51'),
(270, 301, NULL, NULL, NULL, 72, 'Checked In Successfully', 'You have successfully checked in for your appointment with Dr. Emily Williams on 19th December 2024.. Please wait for your turn.', NULL, NULL, '2024-12-19 07:12:13', '2024-12-19 07:12:13'),
(271, 301, NULL, 71, NULL, 72, 'New Prescription Added!', 'A new prescription has been added by Dr. Emily Williams for your recent visit on 19th December 2024.', NULL, NULL, '2024-12-19 07:16:58', '2024-12-19 07:16:58'),
(272, NULL, NULL, NULL, 21, 72, 'Patient File xRay Report Added Successfully', 'A new file, xRay Report has been added for Ashish test family. Please review the patient\'s details and medical history for any necessary follow-up.', NULL, NULL, '2024-12-19 07:17:42', '2024-12-19 07:17:42'),
(273, 301, NULL, NULL, NULL, 72, 'Appointment Visited', 'Your appointment with Dr. Emily Williams on 19th December 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-12-19 07:18:53', '2024-12-19 07:18:53'),
(274, 301, NULL, NULL, NULL, 72, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 19th December 2024 at 01:00 PM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-19 07:19:17', '2024-12-19 07:19:17'),
(275, 296, NULL, NULL, NULL, 61, 'Appointment Visited', 'Your appointment with Dr. Emily Williams on 17th December 2024 has been marked as Visited. We hope your visit went well.', NULL, NULL, '2024-12-19 07:19:51', '2024-12-19 07:19:51'),
(276, 301, NULL, NULL, NULL, 72, 'Cancellation Request Rejected', 'Your request to cancel the appointment with Doctor Emily Williams on 19th December 2024 has been rejected. Please contact the clinic for further assistance.', NULL, NULL, '2024-12-19 07:20:46', '2024-12-19 07:20:46'),
(277, 300, NULL, NULL, NULL, 72, 'Cancellation Request Initiated', 'Your request to cancel the appointment with Doctor Emily Williams on 23rd December 2024 at 09:55 AM has been initiated. We will notify you once it is processed.', NULL, NULL, '2024-12-19 07:21:17', '2024-12-19 07:21:17'),
(278, 300, NULL, NULL, NULL, 72, 'Appointment Cancelled Reuest Approved', 'Your appointment with Dr. Emily Williams on 23rd December 2024 at 09:55 AM has been successfully cancelled.', NULL, NULL, '2024-12-19 07:21:47', '2024-12-19 07:21:47'),
(279, 300, NULL, NULL, NULL, 72, 'Refund Processed', 'The amount of 380 for your cancelled appointment with Dr. Emily Williams on 23rd December 2024 has been refunded to your wallet. You can use this balance for future appointments.', NULL, NULL, '2024-12-19 07:21:47', '2024-12-19 07:21:47'),
(280, 302, NULL, NULL, NULL, 72, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 22nd December 2024 at 10:00 AM is confirmed.', NULL, NULL, '2024-12-19 07:23:07', '2024-12-19 07:23:07'),
(281, NULL, 433, NULL, NULL, 72, 'Wallet Credited', 'An amount of 500.00 has been credited to your wallet.', NULL, NULL, '2024-12-19 07:38:49', '2024-12-19 07:38:49'),
(282, NULL, 434, NULL, NULL, 72, 'Wallet Credited', 'An amount of 250.00 has been credited to your wallet.', NULL, NULL, '2024-12-19 17:17:23', '2024-12-19 17:17:23'),
(283, 303, NULL, NULL, NULL, 36, 'Appointment Successfully Booked!', 'Your appointment with Doctor Emily Williams on 21st December 2024 at 08:02 AM is confirmed.', NULL, NULL, '2024-12-19 18:44:40', '2024-12-19 18:44:40'),
(284, 303, NULL, 72, NULL, 36, 'New Prescription Added!', 'A new prescription has been added by Dr. Emily Williams for your recent visit on 21st December 2024.', NULL, NULL, '2024-12-20 07:34:03', '2024-12-20 07:34:03'),
(285, NULL, 436, NULL, NULL, 72, 'Wallet Credited', 'An amount of 470 has been credited to your wallet.', NULL, NULL, '2024-12-20 18:09:05', '2024-12-20 18:09:05'),
(286, 293, NULL, 70, NULL, 36, 'Prescription Updated', 'Your prescription from Dr. James Smith has been updated. Please review the new details in the app', NULL, NULL, '2024-12-21 08:11:43', '2024-12-21 08:11:43'),
(287, 301, NULL, NULL, NULL, 72, 'Check-In Cancelled', 'Your check-in for the appointment with Dr. Emily Williams on 19th December 2024 has been cancelled. Please check the app for further details.', NULL, NULL, '2024-12-21 14:38:00', '2024-12-21 14:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `video_time_slots`
--

CREATE TABLE `video_time_slots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doct_id` bigint(20) UNSIGNED NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `time_duration` int(11) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vitals_measurements`
--

CREATE TABLE `vitals_measurements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `family_member_id` bigint(20) UNSIGNED NOT NULL,
  `bp_systolic` double DEFAULT NULL COMMENT 'mmHg',
  `bp_diastolic` double DEFAULT NULL COMMENT 'mmHg',
  `weight` double DEFAULT NULL COMMENT 'kg',
  `spo2` double DEFAULT NULL COMMENT 'percentage',
  `temperature` double DEFAULT NULL COMMENT 'F',
  `sugar_random` double DEFAULT NULL COMMENT 'Mg/dl',
  `sugar_fasting` double DEFAULT NULL,
  `type` enum('Blood Pressure','Sugar','SpO2','Weight','Temperature') DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webhook_centrelize_data_log`
--

CREATE TABLE `webhook_centrelize_data_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payload` text DEFAULT NULL,
  `payment_id` varchar(250) DEFAULT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webhook_log`
--

CREATE TABLE `webhook_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` text DEFAULT NULL,
  `status` varchar(250) DEFAULT NULL,
  `response` text DEFAULT NULL,
  `payload` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `web_pages`
--

CREATE TABLE `web_pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_id` int(11) NOT NULL COMMENT '	1=about us,2=privacy,3=terms	 , 4=about us doctor app,5=privacy doctor app,6=terms doctor app	',
  `title` varchar(250) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `web_pages`
--

INSERT INTO `web_pages` (`id`, `page_id`, `title`, `body`, `created_at`, `updated_at`) VALUES
(1, 1, 'About Us', '<h1>About Ussssxxx</h1><p>Welcome to [Your Shop Name], your trusted source for premium dairy products. At [Your Shop Name], we are passionate about delivering the purest and freshest dairy goodness to your doorstep. Our commitment to quality and tradition sets us apart in the world of dairy.</p><h3><strong>Our Story</strong></h3><p>Founded with a vision to provide wholesome dairy products to our community, [Your Shop Name] has been a cornerstone of nourishment and satisfaction for [X] years. Our journey began with a small dairy farm and a dream to share the goodness of dairy with our customers.</p><h3><strong>Our Products</strong></h3><p>We take immense pride in offering a wide range of dairy delights, carefully crafted to meet the highest standards of quality:</p><p><strong>Pure Milk</strong>: Our farm-fresh milk is a testament to the care and love we invest in our cattle. It\'s not just milk; it\'s the essence of our commitment to health and nutrition.</p><p><strong>Creamy Dahi</strong>: Enjoy the rich and creamy texture of our dahi (yogurt), a timeless favorite in Indian households. It\'s the result of a traditional recipe perfected over generations.</p><p><strong>Golden Ghee</strong>: Experience the golden goodness of our ghee, prepared from the finest butter, with a taste that lingers on your taste buds and adds flavor to your meals.</p><p><strong>Delicious Paneer</strong>: Our paneer is soft, fresh, and versatile, making it a staple for both traditional and modern Indian cuisines. It\'s the ideal choice for your culinary adventures.</p><h3><strong>Our Promise</strong></h3><p>Quality and purity are at the heart of everything we do. We maintain the highest hygiene standards and ensure that every product that leaves our shop is a reflection of our dedication to your well-being. We source our ingredients locally, supporting our local farmers and communities.</p><h3>Why Choose Us?</h3><p>Quality Assurance: We are committed to delivering dairy products that meet stringent quality standards.</p><p>Freshness Guaranteed: Our products are always fresh, ensuring you get the best taste and nutrition.</p><p>Community Connection: We are proud to be an integral part of our community, supporting local farmers and businesses.</p><p>Customer Satisfaction: Your satisfaction is our top priority. We are here to serve you with a smile.</p><p>Thank you for choosing [Your Shop Name] as your preferred destination for dairy excellence. We look forward to being a part of your daily life, bringing health, taste, and tradition to your table.</p><p>[Contact Information]</p>', '2024-09-01 09:13:52', '2024-10-24 12:58:58'),
(2, 2, 'Privacy Policy', '<h1>PRIVACY POLICY</h1><p>Last Updated: [Date]</p><p>[Your Company Name] (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.</p><h3>Information We Collect</h3><p>We may collect personal information that you provide to us directly, including but not limited to your name, email address, postal address, phone number, and other contact information when you:</p><p>Register for an account.</p><p>Make a purchase or place an order.</p><p>Subscribe to our newsletter or updates.</p><p>Contact us through our website or customer support.</p><p>We may also collect non-personal information automatically, such as your IP address, browser type, operating system, and browsing behavior when you visit our website.</p><h3>How We Use Your Information</h3><p>We may use your personal information for various purposes, including but not limited to:</p><p>Processing and fulfilling your orders.</p><p>Providing customer support and responding to your inquiries.</p><p>Sending you updates, newsletters, and promotional materials.</p><p>Analyzing website usage to improve our products and services.</p><p>Complying with legal and regulatory requirements.</p><p>Information Sharing</p><p>We may share your personal information with trusted third-party service providers to help us perform services, such as payment processing, shipping, and marketing. These service providers are contractually obligated to protect your information and use it solely for the purposes specified by us.</p><p>We will not sell, trade, or rent your personal information to third parties for their marketing purposes.</p><h3>Cookies and Similar Technologies</h3><p>We may use cookies and similar technologies to enhance your browsing experience. You can manage your preferences for these technologies through your browser settings.</p><h3>Security</h3><p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p><h3>Your Choices</h3><p>You may choose to opt-out of receiving marketing communications from us by following the unsubscribe instructions in our emails or contacting us directly.</p><p>Changes to this Privacy Policy</p><p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. The revised policy will be posted on our website, and the date of the latest update will be indicated.</p><h3>Contact Us</h3><p>If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at [Your Contact Information].</p><p>By using our website or services, you consent to the terms of this Privacy Policy.</p><p>Remember that this is a generic privacy policy template and should be customized to match the specific practices and requirements of your website or business. Additionally, it\'s crucial to stay informed about privacy laws and regulations that may apply to your jurisdiction and industry. Consultation with a legal professional is advisable to ensure compliance.</p>', '2024-09-01 09:13:52', '2024-09-26 19:26:23'),
(3, 3, 'Terms and Conditions', '<h1><strong>TERMS &amp; CONDITION</strong></h1><p>Last Updated: [Date]</p><h3>1. Acceptance of Terms</h3><p>By accessing or using [Your Company Name] (\"we,\" \"us,\" or \"our\") services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p><h3>2. Use of Services</h3><p>You must be of legal age in your jurisdiction to use our services.</p><p>You agree to use our services only for lawful purposes and in accordance with these terms.</p><p>You are responsible for maintaining the confidentiality of your account credentials.</p><p>We reserve the right to modify or discontinue our services at any time without notice.</p><h3>3. Intellectual Property</h3><p>All content, logos, trademarks, and intellectual property displayed on our website or provided through our services are the property of [Your Company Name].</p><p>You may not reproduce, distribute, or use our intellectual property without our express written consent.</p><h3>4. Privacy Policy</h3><p>Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you agree to our Privacy Policy.</p><h3>5. Payments and Fees</h3><p>Payment terms for our services are specified at the time of purchase or registration.</p><p>We may change our pricing and fees at any time and will notify you of such changes.</p><h3>6. Termination</h3><p>We reserve the right to terminate or suspend your account and access to our services for any reason, including a violation of these terms.</p><h3>7. Disclaimers</h3><p>Our services are provided \"as is\" and without warranties of any kind, either expressed or implied.</p><p>We do not guarantee the accuracy, completeness, or reliability of any content provided through our services.</p><h3>8. Limitation of Liability</h3><p>We are not liable for any indirect, incidental, consequential, or punitive damages arising out of your use of our services.</p><h3>9. Governing Law</h3><p>These terms and conditions are governed by the laws of [Your Jurisdiction], without regard to its conflict of laws principles.</p><h3>10. Changes to Terms and Conditions</h3><p>We may update these Terms and Conditions from time to time. The revised terms will be posted on our website, and the date of the latest update will be indicated.</p><h3>Contact Us</h3><p>If you have any questions or concerns about these Terms and Conditions, please contact us at [Your Contact Information].</p><p>By using our services, you agree to these Terms and Conditions.</p>', '2024-09-01 09:13:52', '2024-09-26 19:26:52'),
(4, 4, 'Payment Policy', '<h1>About Ussss</h1><p>Welcome to [Your Shop Name], your trusted source for premium dairy products. At [Your Shop Name], we are passionate about delivering the purest and freshest dairy goodness to your doorstep. Our commitment to quality and tradition sets us apart in the world of dairy.</p><h3><strong>Our Story</strong></h3><p>Founded with a vision to provide wholesome dairy products to our community, [Your Shop Name] has been a cornerstone of nourishment and satisfaction for [X] years. Our journey began with a small dairy farm and a dream to share the goodness of dairy with our customers.</p><h3><strong>Our Products</strong></h3><p>We take immense pride in offering a wide range of dairy delights, carefully crafted to meet the highest standards of quality:</p><p><strong>Pure Milk</strong>: Our farm-fresh milk is a testament to the care and love we invest in our cattle. It\'s not just milk; it\'s the essence of our commitment to health and nutrition.</p><p><strong>Creamy Dahi</strong>: Enjoy the rich and creamy texture of our dahi (yogurt), a timeless favorite in Indian households. It\'s the result of a traditional recipe perfected over generations.</p><p><strong>Golden Ghee</strong>: Experience the golden goodness of our ghee, prepared from the finest butter, with a taste that lingers on your taste buds and adds flavor to your meals.</p><p><strong>Delicious Paneer</strong>: Our paneer is soft, fresh, and versatile, making it a staple for both traditional and modern Indian cuisines. It\'s the ideal choice for your culinary adventures.</p><h3><strong>Our Promise</strong></h3><p>Quality and purity are at the heart of everything we do. We maintain the highest hygiene standards and ensure that every product that leaves our shop is a reflection of our dedication to your well-being. We source our ingredients locally, supporting our local farmers and communities.</p><h3>Why Choose Us?</h3><p>Quality Assurance: We are committed to delivering dairy products that meet stringent quality standards.</p><p>Freshness Guaranteed: Our products are always fresh, ensuring you get the best taste and nutrition.</p><p>Community Connection: We are proud to be an integral part of our community, supporting local farmers and businesses.</p><p>Customer Satisfaction: Your satisfaction is our top priority. We are here to serve you with a smile.</p><p>Thank you for choosing [Your Shop Name] as your preferred destination for dairy excellence. We look forward to being a part of your daily life, bringing health, taste, and tradition to your table.</p><p>[Contact Information]</p>', '2024-09-01 09:13:52', '2024-09-01 09:11:27'),
(5, 5, 'Legal', '<h1>LEGAL</h1><p>Last Updated: [Date]</p><p>[Your Company Name] (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.</p><h3>Information We Collect</h3><p>We may collect personal information that you provide to us directly, including but not limited to your name, email address, postal address, phone number, and other contact information when you:</p><p>Register for an account.</p><p>Make a purchase or place an order.</p><p>Subscribe to our newsletter or updates.</p><p>Contact us through our website or customer support.</p><p>We may also collect non-personal information automatically, such as your IP address, browser type, operating system, and browsing behavior when you visit our website.</p><h3>How We Use Your Information</h3><p>We may use your personal information for various purposes, including but not limited to:</p><p>Processing and fulfilling your orders.</p><p>Providing customer support and responding to your inquiries.</p><p>Sending you updates, newsletters, and promotional materials.</p><p>Analyzing website usage to improve our products and services.</p><p>Complying with legal and regulatory requirements.</p><p>Information Sharing</p><p>We may share your personal information with trusted third-party service providers to help us perform services, such as payment processing, shipping, and marketing. These service providers are contractually obligated to protect your information and use it solely for the purposes specified by us.</p><p>We will not sell, trade, or rent your personal information to third parties for their marketing purposes.</p><h3>Cookies and Similar Technologies</h3><p>We may use cookies and similar technologies to enhance your browsing experience. You can manage your preferences for these technologies through your browser settings.</p><h3>Security</h3><p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p><h3>Your Choices</h3><p>You may choose to opt-out of receiving marketing communications from us by following the unsubscribe instructions in our emails or contacting us directly.</p><p>Changes to this Privacy Policy</p><p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. The revised policy will be posted on our website, and the date of the latest update will be indicated.</p><h3>Contact Us</h3><p>If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at [Your Contact Information].</p><p>By using our website or services, you consent to the terms of this Privacy Policy.</p><p>Remember that this is a generic privacy policy template and should be customized to match the specific practices and requirements of your website or business. Additionally, it\'s crucial to stay informed about privacy laws and regulations that may apply to your jurisdiction and industry. Consultation with a legal professional is advisable to ensure compliance.</p>', '2024-09-01 09:13:52', '2024-09-26 19:27:33'),
(6, 6, 'Other', '<h1>TERMS &amp; CONDITION</h1><p>Last Updated: [Date]</p><h3>1. Acceptance of Terms</h3><p>By accessing or using [Your Company Name] (\"we,\" \"us,\" or \"our\") services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p><h3>2. Use of Services</h3><p>You must be of legal age in your jurisdiction to use our services.</p><p>You agree to use our services only for lawful purposes and in accordance with these terms.</p><p>You are responsible for maintaining the confidentiality of your account credentials.</p><p>We reserve the right to modify or discontinue our services at any time without notice.</p><h3>3. Intellectual Property</h3><p>All content, logos, trademarks, and intellectual property displayed on our website or provided through our services are the property of [Your Company Name].</p><p>You may not reproduce, distribute, or use our intellectual property without our express written consent.</p><h3>4. Privacy Policy</h3><p>Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you agree to our Privacy Policy.</p><h3>5. Payments and Fees</h3><p>Payment terms for our services are specified at the time of purchase or registration.</p><p>We may change our pricing and fees at any time and will notify you of such changes.</p><h3>6. Termination</h3><p>We reserve the right to terminate or suspend your account and access to our services for any reason, including a violation of these terms.</p><h3>7. Disclaimers</h3><p>Our services are provided \"as is\" and without warranties of any kind, either expressed or implied.</p><p>We do not guarantee the accuracy, completeness, or reliability of any content provided through our services.</p><h3>8. Limitation of Liability</h3><p>We are not liable for any indirect, incidental, consequential, or punitive damages arising out of your use of our services.</p><h3>9. Governing Law</h3><p>These terms and conditions are governed by the laws of [Your Jurisdiction], without regard to its conflict of laws principles.</p><h3>10. Changes to Terms and Conditions</h3><p>We may update these Terms and Conditions from time to time. The revised terms will be posted on our website, and the date of the latest update will be indicated.</p><h3>Contact Us</h3><p>If you have any questions or concerns about these Terms and Conditions, please contact us at [Your Contact Information].</p><p>By using our services, you agree to these Terms and Conditions.</p>', '2024-09-01 09:13:52', '2024-09-26 19:26:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_notification`
--
ALTER TABLE `admin_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_notification_appointment_id` (`appointment_id`),
  ADD KEY `admin_notification_txn_id` (`txn_id`);

--
-- Indexes for table `all_transaction`
--
ALTER TABLE `all_transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_transaction_user_id` (`user_id`),
  ADD KEY `appointment_transaction_patient_id` (`patient_id`),
  ADD KEY `appointment_transaction_appointment_id` (`appointment_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_doct_id` (`doct_id`),
  ADD KEY `app_dept_id` (`dept_id`),
  ADD KEY `app_patient_id` (`patient_id`);

--
-- Indexes for table `appointments_invoice_item`
--
ALTER TABLE `appointments_invoice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_invoice_item_invoice_id` (`invoice_id`);

--
-- Indexes for table `appointment_cancellation_req`
--
ALTER TABLE `appointment_cancellation_req`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_cancellation_req_app_id` (`appointment_id`);

--
-- Indexes for table `appointment_checkin`
--
ALTER TABLE `appointment_checkin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkin_appointment_id` (`appointment_id`);

--
-- Indexes for table `appointment_invoice`
--
ALTER TABLE `appointment_invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_invoice_user_id` (`user_id`),
  ADD KEY `appointment_invoice_patient_id` (`patient_id`),
  ADD KEY `appointment_invoice_appointment_id` (`appointment_id`);

--
-- Indexes for table `appointment_payments`
--
ALTER TABLE `appointment_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_payments_txn_id` (`txn_id`),
  ADD KEY `appointment_payments_invoice_id` (`invoice_id`);

--
-- Indexes for table `appointment_status_log`
--
ALTER TABLE `appointment_status_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asl_user_id` (`user_id`),
  ADD KEY `asl_appointment_id` (`appointment_id`),
  ADD KEY `asl_patient_id` (`patient_id`);

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_use`
--
ALTER TABLE `coupon_use`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupon_use_appointment_id_id` (`appointment_id`),
  ADD KEY `coupon_use_user_id` (`user_id`),
  ADD KEY `coupon_use_coupon_id` (`coupon_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_users_id` (`user_id`),
  ADD KEY `doctor_dept_id` (`department`);

--
-- Indexes for table `doctors_review`
--
ALTER TABLE `doctors_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctors_review_doct_id` (`doctor_id`),
  ADD KEY `doctors_review_user_id` (`user_id`),
  ADD KEY `doctors_review_appointment_id` (`appointment_id`);

--
-- Indexes for table `doctor_notification`
--
ALTER TABLE `doctor_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_notification_doctor_id` (`doctor_id`),
  ADD KEY ` doctr_notification_appointment_id` (`appointment_id`),
  ADD KEY `doctor_notification_prescription_id` (`prescription_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `family_members`
--
ALTER TABLE `family_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `family_member_user_id` (`user_id`);

--
-- Indexes for table `login_screen_image`
--
ALTER TABLE `login_screen_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_user_id` (`user_id`);

--
-- Indexes for table `patient_files`
--
ALTER TABLE `patient_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_files_patient_id` (`patient_id`);

--
-- Indexes for table `payment_gateway`
--
ALTER TABLE `payment_gateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `prescribe_medicines`
--
ALTER TABLE `prescribe_medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prescription_appointment_id` (`appointment_id`),
  ADD KEY `prescription_patient_id` (`patient_id`);

--
-- Indexes for table `prescription_item`
--
ALTER TABLE `prescription_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prescription_item_prescription_id` (`prescription_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_permission_role_id` (`role_id`),
  ADD KEY `role_permission_permission_id` (`permission_id`);

--
-- Indexes for table `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_slots_doct_id` (`doct_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_role_assign`
--
ALTER TABLE `users_role_assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_role_assign_user_id` (`user_id`),
  ADD KEY `users_role_assign_role_id` (`role_id`);

--
-- Indexes for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_notification_user_id` (`user_id`),
  ADD KEY `user_notification_appointment_id` (`appointment_id`),
  ADD KEY `user_notification_txn_id` (`txn_id`),
  ADD KEY `user_notification_prescription_id` (`prescription_id`);

--
-- Indexes for table `video_time_slots`
--
ALTER TABLE `video_time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_time_slots_doct_id` (`doct_id`);

--
-- Indexes for table `vitals_measurements`
--
ALTER TABLE `vitals_measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vital_user_id` (`user_id`),
  ADD KEY `vital_family_member_id` (`family_member_id`);

--
-- Indexes for table `webhook_centrelize_data_log`
--
ALTER TABLE `webhook_centrelize_data_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `webhook_log`
--
ALTER TABLE `webhook_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_pages`
--
ALTER TABLE `web_pages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_notification`
--
ALTER TABLE `admin_notification`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `all_transaction`
--
ALTER TABLE `all_transaction`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointments_invoice_item`
--
ALTER TABLE `appointments_invoice_item`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_cancellation_req`
--
ALTER TABLE `appointment_cancellation_req`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_checkin`
--
ALTER TABLE `appointment_checkin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_invoice`
--
ALTER TABLE `appointment_invoice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_payments`
--
ALTER TABLE `appointment_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_status_log`
--
ALTER TABLE `appointment_status_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon_use`
--
ALTER TABLE `coupon_use`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctors_review`
--
ALTER TABLE `doctors_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_notification`
--
ALTER TABLE `doctor_notification`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `family_members`
--
ALTER TABLE `family_members`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_screen_image`
--
ALTER TABLE `login_screen_image`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_files`
--
ALTER TABLE `patient_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_gateway`
--
ALTER TABLE `payment_gateway`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescribe_medicines`
--
ALTER TABLE `prescribe_medicines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription_item`
--
ALTER TABLE `prescription_item`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2551;

--
-- AUTO_INCREMENT for table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `specialization`
--
ALTER TABLE `specialization`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_role_assign`
--
ALTER TABLE `users_role_assign`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_notification`
--
ALTER TABLE `user_notification`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=288;

--
-- AUTO_INCREMENT for table `video_time_slots`
--
ALTER TABLE `video_time_slots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vitals_measurements`
--
ALTER TABLE `vitals_measurements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `webhook_centrelize_data_log`
--
ALTER TABLE `webhook_centrelize_data_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `webhook_log`
--
ALTER TABLE `webhook_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `web_pages`
--
ALTER TABLE `web_pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_transaction`
--
ALTER TABLE `all_transaction`
  ADD CONSTRAINT `appointment_transaction_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `appointment_transaction_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `appointment_transaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `app_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `app_doct_id` FOREIGN KEY (`doct_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `app_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `appointments_invoice_item`
--
ALTER TABLE `appointments_invoice_item`
  ADD CONSTRAINT `appointments_invoice_item_invoice_id` FOREIGN KEY (`invoice_id`) REFERENCES `appointment_invoice` (`id`);

--
-- Constraints for table `appointment_cancellation_req`
--
ALTER TABLE `appointment_cancellation_req`
  ADD CONSTRAINT `appointment_cancellation_req_app_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);

--
-- Constraints for table `appointment_checkin`
--
ALTER TABLE `appointment_checkin`
  ADD CONSTRAINT `checkin_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);

--
-- Constraints for table `appointment_invoice`
--
ALTER TABLE `appointment_invoice`
  ADD CONSTRAINT `appointment_invoice_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `appointment_invoice_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `appointment_invoice_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `appointment_payments`
--
ALTER TABLE `appointment_payments`
  ADD CONSTRAINT `appointment_payments_invoice_id` FOREIGN KEY (`invoice_id`) REFERENCES `appointment_invoice` (`id`),
  ADD CONSTRAINT `appointment_payments_txn_id` FOREIGN KEY (`txn_id`) REFERENCES `all_transaction` (`id`);

--
-- Constraints for table `appointment_status_log`
--
ALTER TABLE `appointment_status_log`
  ADD CONSTRAINT `asl_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `asl_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `asl_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `coupon_use`
--
ALTER TABLE `coupon_use`
  ADD CONSTRAINT `coupon_use_appointment_id_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `coupon_use_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`),
  ADD CONSTRAINT `coupon_use_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctor_dept_id` FOREIGN KEY (`department`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `doctor_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `doctors_review`
--
ALTER TABLE `doctors_review`
  ADD CONSTRAINT `doctors_review_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `doctors_review_doct_id` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `doctors_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `family_members`
--
ALTER TABLE `family_members`
  ADD CONSTRAINT `family_member_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patient_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `patient_files`
--
ALTER TABLE `patient_files`
  ADD CONSTRAINT `patient_files_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  ADD CONSTRAINT `prescription_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `prescription_item`
--
ALTER TABLE `prescription_item`
  ADD CONSTRAINT `prescription_item_prescription_id` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`);

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `role_permission_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `role_permission_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `users_role_assign`
--
ALTER TABLE `users_role_assign`
  ADD CONSTRAINT `users_role_assign_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `users_role_assign_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `vitals_measurements`
--
ALTER TABLE `vitals_measurements`
  ADD CONSTRAINT `vital_family_member_id` FOREIGN KEY (`family_member_id`) REFERENCES `family_members` (`id`),
  ADD CONSTRAINT `vital_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
