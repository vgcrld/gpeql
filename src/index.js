const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");

const GpeDdatabase = 'data__atsgroup'; 

p = p => console.log(p);

// MySql connect #RLDFIX make this a class.
var mysql = require("mysql");
var ms = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "v0Et7jsjrnPQ",
  database: GpeDdatabase,
});

// clickhouse connection as a class
const GpeClickhouse = require("./clickhouse");
ch = new GpeClickhouse(GpeDdatabase);

// Store the resolvers here
const resolvers = {}; 
resolvers.Query = {};

// Resolver to get config names from the pxc database
resolvers.Query.config_names = (parent, {sql}, context, info) => {
    return new Promise(function(resolve, reject){
      ms.query(`select * from config_names ${sql}`, (error,result,fields) => {
        resolve(result);
      });
    })
}

// Resolver to get an individual item
resolvers.Query.item = (parent, args, context, info) => {
    return ch.query(`select * from __items where item_id = ${args.item_id}`);
}

// Resolver to get all items, limit with sql: param
resolvers.Query.items = (parent, { sql }, context, info) => {
  sql = `select * from __items ${sql}`;
  return ch.query(sql);
}

// Resolver to get all configs, limit with sql: param
resolvers.Query.configs = (parent, { sql }, context, info) => {
    sql = `select * from __configs ${sql}`;
    return ch.query(sql);
}

// Let's start up the apllow server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers
  // context: { ch, ms }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
