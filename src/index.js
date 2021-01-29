const { ApolloServer } = require("apollo-server");

const fs = require("fs");
const path = require("path");

function addAPost(parent, args, context, info) {
  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
    },
  });
  return newLink;
}

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: async (parent, args, context) => {
      return context.prisma.link.findUnique({ where: { id: args.id } });
    },
  },

  Mutation: {
    post: addAPost,
    add: addAPost,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
