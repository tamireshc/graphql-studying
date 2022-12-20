const { gql, ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { resolvers, typeDefs } = require("./src/graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (error) => {
    if (error.message.startsWith("usuario existente")) {
      return new Error(error.message);
    }
    return error;
  },
});

server.listen({ port: 4002 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4002`)
);
