CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collection_id`  int(11) NOT NULL,
  `post_type` varchar(1025)  NULL, 
  `post_title` varchar(1024)  NULL,
  `post_text` Text  NULL,
  `post_tags` varchar(1024)  NULL, 
  `post_video_url` varchar(1025)  NULL, 
  `post_img` varchar(1025)  NULL, 
  `post_link_url` varchar(1025)  NULL, 
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP NULL,
  `update_date` datetime ON UPDATE CURRENT_TIMESTAMP NULL,
  `created_by` varchar(1024)  NULL,
  `updated_by` varchar(1024)  NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

