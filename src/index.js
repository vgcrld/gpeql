// Basic requires
const fs = require("fs");
const path = require("path");

// Apollo support, and clickhouse
const { ApolloServer } = require("apollo-server");
const GpeClickhouse = require("./pkg/clickhouse");
const GpeMySQL = require("./pkg/mysql");

// Other setup
const p = (p) => console.log(p);
const gpeDatabase = "data__atsgroup";

// MySQL and ClickHouse connection as a class
ch = new GpeClickhouse(gpeDatabase);
ms = new GpeMySQL(gpeDatabase);

// Store the resolvers here
const resolvers = { Query: {} };

// Resolver to get config names from the pxc database
resolvers.Query.configs = resolvers.Query.config_names = ( parent, { sql }, context, info ) => {
  return new Promise(function (resolve, reject) {
    let fullSql = `select * from config_names ${sql}`;
    ms.connection.query(fullSql, (error, result, fields) => {
      if (error) {
        p(error.sqlMessage);
      } else {
        resolve(result);
      }
    });
  });
};

// Resolver to get an individual item
resolvers.Query.item = (parent, args, context, info) => {
  return ch.query(`select * from __items where item_id = ${args.item_id}`);
};

// Resolver to get all items, limit with sql: param
resolvers.Query.items = (parent, { sql }, context, info) => {
  sql = `select * from __items ${sql}`;
  return ch.query(sql);
};

// Resolver to get all configs, limit with sql: param
resolvers.Query.configs = (parent, { sql }, context, info) => {
  sql = ` select type,item_id,config_id,argMax(config_value,insert_ts) config_value
          from __configs ${sql}
          group by type,item_id,config_id;`;
  return ch.query(sql);
};

// Item Type and Tags
resolvers.Query.item_info = (parent, { where, limit, having }, context, info) => {
  console.log(typeof limit,'limit',limit)
  let whereClause = ''
  let limitClause = ''
  whereClause  = (where === '')   ? '' : whereClause =  `where  ${where}`;
  limitClause  = (limit === 0 )   ? '' : limitClause =  `limit  ${limit}`;
  havingClause = (having === '' ) ? '' : havingClause = `having ${having}`;
  sql = ` select type, tags, count(*) as count
          from __items
          ${whereClause}
          group by type, tags
          ${havingClause}
          order by type
          ${limitClause};
  `
  console.log(sql);
  return ch.query(sql);
};

// Let's start up the apllow server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "pkg/schema.graphql"), "utf8"),
  resolvers,
  // context: { ch, ms }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
