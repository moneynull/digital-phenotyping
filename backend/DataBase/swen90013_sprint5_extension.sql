DROP TABLE IF EXISTS tb_admin, tb_clinician;
ALTER TABLE applications_foreground ADD application_category TEXT NULL;

DROP TABLE IF EXISTS tb_client;
CREATE TABLE IF NOT EXISTS tb_client
(
  `uid` INT(11) NOT NULL,
  `clinician_id` VARCHAR(255) NOT NULL,
  `client_title` VARCHAR(255) DEFAULT NULL,
  `first_name` VARCHAR(255) DEFAULT NULL,
  `last_name` VARCHAR(255) DEFAULT NULL,
  `date_of_birth` VARCHAR(255) DEFAULT NULL,
  `age` INT DEFAULT NULL,
  `text_notes` TEXT,
  `status` VARCHAR(255) DEFAULT 'Normal',
  `twitter_id` VARCHAR(255) DEFAULT NULL,
  `facebook_id` VARCHAR(255) DEFAULT NULL,
  `aware_device_id` VARCHAR(255) DEFAULT NULL,
  `last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
);

# init tb_client data 
DELETE FROM tb_client;

INSERT INTO `tb_client` 
	(`uid`, 
	`clinician_id`, 
	`client_title`, 
	`first_name`, 
	`last_name`, 
	`date_of_birth`, 
	`age`, 
	`aware_device_id`
	)
	VALUES
	(1, 
	'1', 
	'Ms.', 
	'Tom', 
	'Garcia', 
	'1986-10-01', 
	'36', 
	'0e6b7ce2-633e-476a-9ca3-a19240faeca1' 
	);


INSERT INTO `tb_client` 
	(`uid`, 
	`clinician_id`, 
	`client_title`, 
	`first_name`, 
	`last_name`, 
	`date_of_birth`, 
	`age`, 
	`aware_device_id`
	)
	VALUES
	(3, 
	'1', 
	'Mr.', 
	'Jerry', 
	'Tom', 
	'1967-06-01', 
	'55', 
	'de6271d9-02ff-4472-aa6a-ee5584235d5b' 
	);

INSERT INTO `tb_client` 
	(`uid`, 
	`clinician_id`, 
	`client_title`, 
	`first_name`, 
	`last_name`, 
	`date_of_birth`, 
	`age`, 
	`aware_device_id`
	)
	VALUES
	(4, 
	'1', 
	'Mr.', 
	'Chain', 
	'Smoker', 
	'1977-06-01', 
	'45', 
	'b48bfcac-d616-4b0b-98bd-ee5e85a7dbdc' 
	);

INSERT INTO `tb_client` 
	(`uid`, 
	`clinician_id`, 
	`client_title`, 
	`first_name`, 
	`last_name`, 
	`date_of_birth`, 
	`age`, 
	`aware_device_id`
	)
	VALUES
	(2, 
	'1', 
	'Mr.', 
	'Anakin', 
	'Skywalker', 
	'1967-06-01', 
	'55', 
	'1cd23312-6180-448d-87a5-2004fb9432b2' 
	);

UPDATE tb_client t1
INNER JOIN (SELECT id,first_name FROM auth_user) t2
ON t1.first_name=t2.first_name
SET t1.uid=t2.id;



