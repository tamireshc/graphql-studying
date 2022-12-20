const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { resolvers, typeDefs } = require("./src/graphql");
const UsuarioCadastroService = require("./src/services/UsuarioCadastroService");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (error) => {
    // if (error.message.startsWith("usuario existente")) {
    //   return new Error(error.message);
    // }
    return error;
  },
  context:()=>{
   UsuarioCadastroService
  }
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);
