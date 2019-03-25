CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id`  int(11) NOT NULL,
  `msg` varchar(1024)  NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP NULL,
  `update_date` datetime ON UPDATE CURRENT_TIMESTAMP NULL,
  `created_by` varchar(1024)  NULL,
  `updated_by` varchar(1024)  NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

