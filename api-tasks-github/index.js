const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { resolvers, typeDefs } = require("./src/graphql");
const GitHubService = require("./src/services/GitHub.service");
const TasksRegisterService = require("./src/services/TasksRegisterService");
const UserRegisterService = require("./src/services/UserRegisterService");

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
  dataSources: () => ({
    githubService: GitHubService,
    userRegisterService: UserRegisterService,
    taskService: TasksRegisterService,
  }),
  context: ({ req }) => {
    const user_id = req.headers.authorization;
    return {
      user_id,
    };
  },
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);
