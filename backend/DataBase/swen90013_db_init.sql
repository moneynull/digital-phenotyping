/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.38-log : Database - swen90013
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`swen90013` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `swen90013`;

/*Table structure for table `applications_foreground` */

DROP TABLE IF EXISTS `applications_foreground`;

CREATE TABLE `applications_foreground` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `is_system_app` int(11) DEFAULT '0',
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4167 DEFAULT CHARSET=utf8;

/*Table structure for table `auth_group` */

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `auth_group_permissions` */

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `auth_permission` */

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8;

/*Table structure for table `auth_user` */

DROP TABLE IF EXISTS `auth_user`;

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Table structure for table `auth_user_groups` */

DROP TABLE IF EXISTS `auth_user_groups`;

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `auth_user_user_permissions` */

DROP TABLE IF EXISTS `auth_user_user_permissions`;

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `aware_device` */

DROP TABLE IF EXISTS `aware_device`;

CREATE TABLE `aware_device` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `board` text,
  `brand` text,
  `device` text,
  `build_id` text,
  `hardware` text,
  `manufacturer` text,
  `model` text,
  `product` text,
  `serial` text,
  `release` text,
  `release_type` text,
  `sdk` text,
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Table structure for table `battery` */

DROP TABLE IF EXISTS `battery`;

CREATE TABLE `battery` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_status` int(11) DEFAULT '0',
  `battery_level` int(11) DEFAULT '0',
  `battery_scale` int(11) DEFAULT '0',
  `battery_voltage` int(11) DEFAULT '0',
  `battery_temperature` int(11) DEFAULT '0',
  `battery_adaptor` int(11) DEFAULT '0',
  `battery_health` int(11) DEFAULT '0',
  `battery_technology` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3856 DEFAULT CHARSET=utf8;

/*Table structure for table `battery_charges` */

DROP TABLE IF EXISTS `battery_charges`;

CREATE TABLE `battery_charges` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_start` int(11) DEFAULT '0',
  `battery_end` int(11) DEFAULT '0',
  `double_end_timestamp` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;

/*Table structure for table `battery_discharges` */

DROP TABLE IF EXISTS `battery_discharges`;

CREATE TABLE `battery_discharges` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_start` int(11) DEFAULT '0',
  `battery_end` int(11) DEFAULT '0',
  `double_end_timestamp` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

/*Table structure for table `bluetooth` */

DROP TABLE IF EXISTS `bluetooth`;

CREATE TABLE `bluetooth` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `bt_address` varchar(150) DEFAULT '',
  `bt_name` text,
  `bt_rssi` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=159651 DEFAULT CHARSET=utf8;

/*Table structure for table `calls` */

DROP TABLE IF EXISTS `calls`;

CREATE TABLE `calls` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `call_type` int(11) DEFAULT '0',
  `call_duration` int(11) DEFAULT '0',
  `trace` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=325 DEFAULT CHARSET=utf8;

/*Table structure for table `django_admin_log` */

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Table structure for table `django_apscheduler_djangojob` */

DROP TABLE IF EXISTS `django_apscheduler_djangojob`;

CREATE TABLE `django_apscheduler_djangojob` (
  `id` varchar(255) NOT NULL,
  `next_run_time` datetime(6) DEFAULT NULL,
  `job_state` longblob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_apscheduler_djangojob_next_run_time_2f022619` (`next_run_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `django_apscheduler_djangojobexecution` */

DROP TABLE IF EXISTS `django_apscheduler_djangojobexecution`;

CREATE TABLE `django_apscheduler_djangojobexecution` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `run_time` datetime(6) NOT NULL,
  `duration` decimal(15,2) DEFAULT NULL,
  `finished` decimal(15,2) DEFAULT NULL,
  `exception` varchar(1000) DEFAULT NULL,
  `traceback` longtext,
  `job_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_job_executions` (`job_id`,`run_time`),
  KEY `django_apscheduler_djangojobexecution_run_time_16edd96b` (`run_time`),
  CONSTRAINT `django_apscheduler_djangojobexecution_job_id_daf5090a_fk` FOREIGN KEY (`job_id`) REFERENCES `django_apscheduler_djangojob` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `django_content_type` */

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8;

/*Table structure for table `django_migrations` */

DROP TABLE IF EXISTS `django_migrations`;

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

/*Table structure for table `django_session` */

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `locations` */

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_latitude` double DEFAULT '0',
  `double_longitude` double DEFAULT '0',
  `double_bearing` double DEFAULT '0',
  `double_speed` double DEFAULT '0',
  `double_altitude` double DEFAULT '0',
  `provider` text,
  `accuracy` double DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6538 DEFAULT CHARSET=utf8;

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `message_type` int(11) DEFAULT '0',
  `trace` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8;

/*Table structure for table `screen` */

DROP TABLE IF EXISTS `screen`;

CREATE TABLE `screen` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `screen_status` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10225 DEFAULT CHARSET=utf8;

/*Table structure for table `tb_client` */

DROP TABLE IF EXISTS `tb_client`;

CREATE TABLE `tb_client` (
  `uid` int(11) NOT NULL,
  `clinician_id` varchar(255) NOT NULL,
  `client_title` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `text_notes` text,
  `status` varchar(255) DEFAULT 'Normal',
  `twitter_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `aware_device_id` varchar(255) DEFAULT NULL,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `twitter_id_int` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `tb_loc_cluster` */

DROP TABLE IF EXISTS `tb_loc_cluster`;

CREATE TABLE `tb_loc_cluster` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT NULL,
  `device_id` varchar(150) NOT NULL,
  `double_latitude` double DEFAULT NULL,
  `double_longitude` double DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `loc_type` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

/*Table structure for table `twitter_hashtag` */

DROP TABLE IF EXISTS `twitter_hashtag`;

CREATE TABLE `twitter_hashtag` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `twitter_id_int` varchar(45) NOT NULL,
  `hashtag` varchar(45) NOT NULL,
  `occurrence` int(11) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=511 DEFAULT CHARSET=utf8;

/*Table structure for table `twitter_topics` */

DROP TABLE IF EXISTS `twitter_topics`;

CREATE TABLE `twitter_topics` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `twitter_id_int` varchar(45) NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `occurrence` int(11) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

/*Table structure for table `twitter_word_cloud` */

DROP TABLE IF EXISTS `twitter_word_cloud`;

CREATE TABLE `twitter_word_cloud` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `twitter_id` varchar(32) NOT NULL,
  `word` varchar(45) NOT NULL,
  `occurrence` int(11) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3156 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
