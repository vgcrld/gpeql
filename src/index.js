const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");

const gpeDatabase = "data__atsgroup";

const p = (p) => console.log(p);

// clickhouse connection as a class
const GpeClickhouse = require("./clickhouse");
ch = new GpeClickhouse(gpeDatabase);

// clickhouse connection as a class
const GpeMySQL = require("./mysql");
ms = new GpeMySQL(gpeDatabase);

// Store the resolvers here
const resolvers = { Query: {} };

// Resolver to get config names from the pxc database
resolvers.Query.configs =
  resolvers.Query.config_names = (parent, { sql }, context, info) => {
    return new Promise(function (resolve, reject) {
      let fullSql = `select * from config_names ${sql}`;
      ms.connection.query(fullSql, (error, result, fields) => {
        if (error) {
          p(error.sqlMessage)
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
  sql = `
    select type,item_id,config_id,argMax(config_value,insert_ts) config_value
    from __configs ${sql} 
    group by type,item_id,config_id;`;
  return ch.query(sql);
};

// Let's start up the apllow server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  // context: { ch, ms }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
