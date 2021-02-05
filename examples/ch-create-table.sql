
/* 
      Create the ch to mysql connection and merge in config

 */
DROP TABLE IF EXISTS `data__atsgroup`.`config_with_names`;

CREATE TABLE `data__atsgroup`.`config_with_names` (
  `id` int unsigned,
  `string` VARCHAR(255),
  `insert_ts` TIMESTAMP
) ENGINE MySQL('core-pxc:3306', 'data__atsgroup', 'config_names', 'rdavis', 'qJS@H!sFOMmy' );


-- select configs with names
SELECT
    v.type AS `type`,
    v.item_id AS `item_id`,
    n.string AS `config`,
    max(v.insert_ts) AS `update_ts`,
    argMax(v.config_value,v.insert_ts)  AS `value`
FROM __configs AS v, config_with_names AS n
WHERE n.id = v.config_id 
GROUP BY `type`, `item_id`, `config`
ORDER BY `item_id`, `config`
;


-- all the item types and their tags
select type, tags, count(*) as count from __items group by type, tags order by type;