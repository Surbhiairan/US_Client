CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP NULL,
  `update_date` datetime ON UPDATE CURRENT_TIMESTAMP NULL,
  `created_by` varchar(1024)  NULL,
  `updated_by` varchar(1024)  NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



SELECT count(*)
INTO @exist_column
FROM information_schema.columns
WHERE COLUMN_NAME = 'is_profile'
      AND TABLE_NAME = 'user'
      AND TABLE_SCHEMA = Database();

set @query = IF(
    @exist_column < 1, -- column does not exist
    'alter table user add column is_profile tinyint(11) Default 0 after is_active', -- insert column first
    'select \'Column Exists\' status' -- else just do meaningless select
);
prepare stmt from @query;
EXECUTE stmt;

SELECT count(*)
INTO @exist_column
FROM information_schema.columns
WHERE COLUMN_NAME = 'email'
      AND TABLE_NAME = 'user'
      AND TABLE_SCHEMA = Database();

set @query = IF(
    @exist_column < 1, -- column does not exist
    'ALTER TABLE user ADD UNIQUE (email);', -- insert column first
    'select \'Column Exists\' status' -- else just do meaningless select
);
prepare stmt from @query;
EXECUTE stmt;


SELECT count(*)
INTO @exist_column
FROM information_schema.columns
WHERE COLUMN_NAME = 'source'
      AND TABLE_NAME = 'user'
      AND TABLE_SCHEMA = Database();

set @query = IF(
    @exist_column < 1, -- column does not exist
    'alter table user add column source char(2) Default null after is_active', -- insert column first
    'select \'Column Exists\' status' -- else just do meaningless select
);
prepare stmt from @query;
EXECUTE stmt;



