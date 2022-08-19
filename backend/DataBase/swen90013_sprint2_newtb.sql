/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.37 : Database - swen90013
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

/*Data for the table `tb_loc_cluster` */

insert  into `tb_loc_cluster`(`_id`,`timestamp`,`device_id`,`double_latitude`,`double_longitude`,`address`,`loc_type`) values 
(1,1641571200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77413815492764,144.95948903728276,'11 Union St, Brunswick VIC 3056, Australia','street_address'),
(2,1641571200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77433569519291,144.95985022466843,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(3,1641657600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77420770935547,144.96026625576388,'3-5 Union St, Brunswick VIC 3056, Australia','street_address'),
(4,1641657600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.799253178153954,144.96444632664054,'720 Swanston St, Carlton VIC 3053, Australia','university'),
(5,1641744000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77433605374391,144.95987126213655,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(6,1641744000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77430742693002,144.95917347442656,'15A Union St, Brunswick VIC 3056, Australia','premise'),
(7,1641830400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.79922583741917,144.9655170197607,'321 Cardigan St, Carlton VIC 3053, Australia','premise'),
(8,1641830400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.774566676514475,144.9599840905078,'5-7 Little Gold St, Brunswick VIC 3056, Australia','street_address'),
(9,1641916800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.79743329327986,144.96497852127874,'806-814 Swanston St, Carlton VIC 3053, Australia','establishment'),
(10,1641916800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.722906006241715,144.958145471088,'4 Athol Ave, Coburg North VIC 3058, Australia','premise'),
(11,1641916800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77429933110043,144.95980653806902,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(12,1642003200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77433561445871,144.95981326657898,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(13,1642003200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.76704290391224,144.97305289428454,'386 Lygon St, Brunswick East VIC 3057, Australia','premise'),
(14,1642003200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.765025244919855,144.98153342170616,'235 Stewart St, Brunswick East VIC 3057, Australia','street_address'),
(15,1642089600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77451175092453,144.95997766775986,'3 Union St, Brunswick VIC 3056, Australia','street_address'),
(16,1642089600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.80000676288108,144.9649120269854,'Shop F/700 Swanston St, Carlton VIC 3053, Australia','restaurant'),
(17,1642176000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77428134944075,144.95981850837168,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(18,1642176000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-36.542822141200304,146.64726943708956,'20 Merriang Gap Rd, Whorouly East VIC 3735, Australia','car_repair'),
(19,1642262400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.774535702490226,144.95989918885184,'5-7 Little Gold St, Brunswick VIC 3056, Australia','street_address'),
(20,1642262400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.799120524798084,144.96429498120983,'162, The University of Melbourne, Monash Rd, Parkville VIC 3052, Australia','premise'),
(21,1642348800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.778600772640054,144.96091708191219,'400 Royal Parade, Carlton North VIC 3054, Australia','establishment'),
(22,1642348800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.79831936539044,144.96459128910337,'278 Faraday St, Carlton VIC 3053, Australia','street_address'),
(23,1644249600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77436250164587,144.95990933894402,'2/5A Union St, Brunswick VIC 3056, Australia','establishment'),
(24,1644249600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77871004686924,144.9610391462959,'400 Royal Parade, Carlton North VIC 3054, Australia','establishment'),
(25,1644595200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.76840899664291,144.9624359534627,'410 Sydney Rd, Brunswick VIC 3056, Australia','premise'),
(26,1644595200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.771311058444226,144.95959110266796,'16 Dawson St, Brunswick VIC 3056, Australia','street_address'),
(27,1645286400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70058512001594,144.9641766153506,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(28,1645286400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.7002369472757,144.9640105292201,'9 Boston St, Fawkner VIC 3060, Australia','premise'),
(29,1645804800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70041382405907,144.96417694725096,'10 Boston St, Fawkner VIC 3060, Australia','premise'),
(30,1645804800000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70059576868032,144.96427309588037,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(31,1645891200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.79581307027423,144.9656779542744,'11 Palmerston Pl, Carlton VIC 3053, Australia','street_address'),
(32,1645891200000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70396369085917,144.96439326563495,'15 Basil St, Fawkner VIC 3060, Australia','premise'),
(33,1646409600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70087120588869,144.9640659838915,'4 Boston St, Fawkner VIC 3060, Australia','premise'),
(34,1646409600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70054795707211,144.9641954247457,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(35,1646496000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.700875124062904,144.96403620293032,'4 Boston St, Fawkner VIC 3060, Australia','premise'),
(36,1646496000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77364698836548,144.9601160275511,'2 Manallack St, Brunswick VIC 3056, Australia','lodging'),
(37,1646496000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.798882187061466,144.96586094561104,'264 Cardigan St, Carlton VIC 3053, Australia','street_address'),
(38,1646496000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.73344097309746,144.9545026011765,'52 Fischer St, Coburg VIC 3058, Australia','premise'),
(39,1646582400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.79956083299218,144.96432454838833,'720 Swanston St, Carlton VIC 3053, Australia','cafe'),
(40,1646582400000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.77585565345483,144.96047200497014,'67 Sydney Rd, Brunswick VIC 3056, Australia','street_address'),
(41,1646841600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70074211919044,144.96434717442355,'6 Boston St, Fawkner VIC 3060, Australia','premise'),
(42,1646841600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.73575228870115,144.96268453111375,'19 Stock St, Coburg VIC 3058, Australia','premise'),
(43,1646841600000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.72889450396178,144.94907685380895,'119 Sussex St, Pascoe Vale VIC 3044, Australia','premise'),
(44,1646928000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70057508237196,144.9638993005181,'5 Boston St, Fawkner VIC 3060, Australia','premise'),
(45,1646928000000,'0e6b7ce2-633e-476a-9ca3-a19240faeca1',-37.70056468193815,144.96416893968092,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(46,1646409600000,'de6271d9-02ff-4472-aa6a-ee5584235d5b',-37.70042254670573,144.9642606156609,'10 Boston St, Fawkner VIC 3060, Australia','premise'),
(47,1646409600000,'de6271d9-02ff-4472-aa6a-ee5584235d5b',-37.700576739928366,144.96416322694694,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(48,1642608000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.7005755975,144.9641781025,'8 Boston St, Fawkner VIC 3060, Australia','premise'),
(49,1642608000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.715247885,144.961555235,'Fawkner, Sydney Rd, Hadfield VIC 3046, Australia','train_station'),
(50,1643040000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.79633493269231,144.96481987423078,'850-852 Swanston St, Carlton VIC 3053, Australia','street_address'),
(51,1643040000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.715824639000004,144.95971075,'Fawkner, Sydney Rd, Hadfield VIC 3046, Australia','cemetery'),
(52,1643126400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.767884724666665,144.95715270333332,'331 Albert St, East Melbourne VIC 3002, Australia','premise'),
(53,1643126400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.702424218780486,144.96993873707316,'C B Smith Reserve, 77 Jukes Rd, Fawkner VIC 3060, Australia','establishment'),
(54,1643212800000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.75556665533333,144.96930657133333,'52 Blair St, Coburg VIC 3058, Australia','premise'),
(55,1643212800000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.652170708,145.01856891875,'119 Cooper St, Epping VIC 3076, Australia','premise'),
(56,1643299200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.7909622384,144.9641696816,'6X57+JM Carlton North VIC, Australia','plus_code'),
(57,1643299200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.649679954166665,145.02213386166667,'89 Coulstock St, Epping VIC 3076, Australia','premise'),
(58,1643299200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.71788577190476,144.96232541285715,'Police Complex/Sydney Rd, Fawkner VIC 3060, Australia','transit_station'),
(59,1643385600000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.698908021034484,144.96607986068966,'54 Preston St, Fawkner VIC 3060, Australia','premise'),
(60,1643385600000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.6999756525,144.978899660625,'240 McBryde St, Fawkner VIC 3060, Australia','premise'),
(61,1643558400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.77251803958333,144.9522564275,'3-5 Barry St, Brunswick VIC 3056, Australia','street_address'),
(62,1643558400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.6504794425,145.02162790666668,'87-89 Wedge St, Epping VIC 3076, Australia','street_address'),
(63,1643558400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.71772483,144.96163592666667,'1151 Sydney Rd, Hadfield VIC 3046, Australia','premise'),
(64,1643558400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.79601357357143,144.96202863714285,'Sports Centre, Parkville VIC 3052, Australia','premise'),
(65,1643904000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.78651740322581,144.9624989970968,'Princes Hill Tennis Club, 121 Princes Park Dr, Carlton North VIC 3054, Australia','gym'),
(66,1643904000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.722628386,144.95431169399998,'7 Lincoln Ave, Coburg North VIC 3058, Australia','premise'),
(67,1643990400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.69073669490909,144.94672808763636,'41 Glenlitta Ave, Broadmeadows VIC 3047, Australia','street_address'),
(68,1643990400000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.6621904625,145.03492107666668,'27 Beaumont Cres, Lalor VIC 3075, Australia','premise'),
(69,1644076800000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.70890069018182,144.965719992,'26 Piper St, Fawkner VIC 3060, Australia','street_address'),
(70,1644076800000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.65810438,145.00245612153847,'72 Rosemary Dr, Lalor VIC 3075, Australia','premise'),
(71,1644163200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.705356928,144.97749850099999,'166 McBryde St, Fawkner VIC 3060, Australia','premise'),
(72,1644163200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.72349327,144.96833594416665,'58 Trade Pl, Coburg North VIC 3058, Australia','premise'),
(73,1644163200000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.702128727777776,144.96334530333334,'10 Margaret St, Fawkner VIC 3060, Australia','premise'),
(74,1644249600000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.702476247727276,144.96954312295455,'99 Jukes Rd, Fawkner VIC 3060, Australia','establishment'),
(75,1644249600000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.73442667142857,144.97280676285715,'1 Golf Rd, Coburg North VIC 3058, Australia','premise'),
(76,1644336000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.712604,144.96445508058824,'1126 Sydney Rd, Fawkner VIC 3060, Australia','premise'),
(77,1644336000000,'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc',-37.79155923695652,144.97002971956522,'580 Drummond St, Carlton North VIC 3054, Australia','premise');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
