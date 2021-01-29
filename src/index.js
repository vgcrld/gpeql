const { ApolloServer } = require("apollo-server");
const GpeClickhouse = require("./clickhouse")


ch = new GpeClickhouse('data__atsgroup');
ch.getItems()



const fs = require("fs");
const path = require("path");

const resolvers = {}

function items(parent, args, context, info) {
  console.log(clickhouse.sql.items)
  return {};
}

function about() { 
  return "Copyright 2021 Rich Davis" 
} 

resolvers.Query = {
    info: () => about(),
    items: items,
  }


const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ch
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
