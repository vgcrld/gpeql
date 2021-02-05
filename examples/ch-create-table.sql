

DROP TABLE IF EXISTS `data__rdavis2`.`rdavis_config_names`;

CREATE TABLE `data__rdavis2`.`rdavis_config_names` (
  `id` int unsigned,
  `string` VARCHAR(255),
  `insert_ts` TIMESTAMP
) ENGINE MySQL('core-pxc:3306', 'data__rdavis2', 'config_names', 'rdavis', 'qJS@H!sFOMmy' );

SELECT
    v.type AS `type`,
    v.item_id AS `item_id`,
    n.string AS `config`,
    max(v.insert_ts) AS `update_ts`,
    argMax(v.config_value,v.insert_ts) AS `value`
FROM __configs AS v, rdavis_config_names AS n
WHERE n.id = v.config_id 
AND v.item_id IN (1)
GROUP BY `type`, `item_id`, `config`
ORDER BY `item_id`, `config`
;