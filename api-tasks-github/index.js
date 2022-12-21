const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const NoPermissionError = require("./src/errors/NoPermissionError");
const TaskNotFoundError = require("./src/errors/taskNotFoundError");
const UserNotFoundError = require("./src/errors/UserNotFoundError");

const { resolvers, typeDefs } = require("./src/graphql");
const generator = require("./src/helpers/generator");
const GitHubService = require("./src/services/GitHub.service");
const TasksRegisterService = require("./src/services/TasksRegisterService");
const UserRegisterService = require("./src/services/UserRegisterService");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

  formatError: (error) => {
    if (error.originalError instanceof NoPermissionError) {
      return new Error(error.message);
    }

    if (error.originalError instanceof TaskNotFoundError) {
      return new Error(error.message);
    }

    if (error.originalError instanceof UserNotFoundError) {
      return new Error(error.message);
    }
    return error;
  },

  dataSources: () => ({
    githubService: GitHubService,
    userRegisterService: UserRegisterService,
    taskService: TasksRegisterService,
  }),

  context: ({ req }) => {
    const token = req.headers.authorization;
    return {
      validate() {
        try {
          const { id } = generator.verifyToken(token);
          return id;
        } catch (error) {
          throw new NoPermissionError("Você não está autenticado");
        }
      },
    };
  },
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);
