const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { resolvers, typeDefs } = require("./src/graphql");
const UsuariocadastroService = require("./src/services/UsuarioCadastroService");
const usuarioCadastroService = new UsuariocadastroService();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (error) => {
    // if (error.message.startsWith("usuario existente")) {
    //   return new Error(error.message);
    // }
    console.log(error);
    return error;
  },
  context: () => ({ usuarioCadastroService }),
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);
