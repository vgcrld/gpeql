DROP TABLE IF EXISTS `pxc_config_names`;
DROP TABLE IF EXISTS `pxc_columns`;
DROP TABLE IF EXISTS `pxc_types`;
DROP TABLE IF EXISTS `pxc_data_types`;

-- The MySQL table with the config names
CREATE TABLE `pxc_config_names`
(
    `id`        int unsigned,
    `string`    VARCHAR(255),
    `insert_ts` TIMESTAMP
) ENGINE MySQL('core-pxc:3306', 'data__rdavis2', 'config_names', 'rdavis', 'qJS@H!sFOMmy');

-- The MySQL table with the column names
CREATE TABLE `pxc_columns`
(
    `id`            int unsigned,
    `type_id`       int unsigned,
    `alias`         VARCHAR(255),
    `alias_type`    VARCHAR(25),
    `data_type_id`  int unsigned,
    `data_type_num` int unsigned,
    `insert_ts`     TIMESTAMP
) ENGINE MySQL('core-pxc:3306', 'data__rdavis2', 'columns', 'rdavis', 'qJS@H!sFOMmy');

-- The MySQL table with the column names
CREATE TABLE `pxc_types`
(
    id         int unsigned,
    string     VARCHAR(1024),
    kind       int,
    insert_ts  TIMESTAMP
) ENGINE MySQL('core-pxc:3306', 'data__rdavis2', 'types', 'rdavis', 'qJS@H!sFOMmy');

-- The MySQL table with the column data types
CREATE TABLE `pxc_data_types`
(
    id        int unsigned,
    string    varchar(64),
    insert_ts timestamp
) ENGINE MySQL('core-pxc:3306', 'data__rdavis2', 'data_types', 'rdavis', 'qJS@H!sFOMmy');

select distinct type from __items;

-- specifying the type or item_id in the inner select makes this much faster.
select type,item_id,config,config_ts,value,name,tags from (

            SELECT v.type                              AS `type`,
                   v.item_id                           AS `item_id`,
                   v.config_id                         AS `config_id`,
                   n.string                            AS `config`,
                   max(v.insert_ts)                    AS `config_ts`,
                   argMax(v.config_value, v.insert_ts) AS `value`
            FROM __configs AS v, pxc_config_names AS n
            WHERE n.id = v.config_id
              AND v.type in ('tsminstance')
--               AND v.type in ('host')
            GROUP BY `type`, `item_id`, `config_id`, `config`
            ORDER BY `item_id`, `config`

) config, (select distinct item_id,name,tags from items) item where config.item_id = item.item_id;


-- select *
-- from pxc_columns a,
--      pxc_data_types b,
--      pxc_types c
-- where (a.type_id = c.id) JOIN ON a.data_type_id;

select * from __trends where type = 'tsminstance';

