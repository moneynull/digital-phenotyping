DROP TABLE IF EXISTS twitter_word_cloud;
CREATE TABLE IF NOT EXISTS twitter_word_cloud
(
  `_id` int(11) NOT NULL auto_increment,
  `twitter_id` varchar(32) NOT NULL,
  `word` varchar(45) NOT NULL,
  `occurance` int(11) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `twitter_word_cloud`
(`_id`,
`twitter_id`,
`word`,
`occurance`)
VALUES
(1,
1,
"test",
12);

UPDATE `swen90013`.`tb_client`
SET
`twitter_id` = 1
WHERE `uid` = 6;
