const generator = require("../../../helpers/generator");

module.exports = {
  User: {
    async tasks(user, _, { dataSources }) {
      console.log(dataSources.taskService);
      return await dataSources.taskService.getTasks(user.id);
    },
  },
  Query: {
    async user(_, { login }, { dataSources }) {
      const userFound = await dataSources.userRegisterService.getUserByLogin(
        login
      );
      // console.log("userfound", userFound);
      if (userFound) {
        userFound.token = generator.createToken(userFound.id);
        return userFound;
      }

      const { login: loginGit, avatar_url } =
        await dataSources.githubService.getUser(login);
      // console.log(loginGit, avatar_url);
      const newUser = await dataSources.userRegisterService.addUser({
        login: loginGit,
        avatar_url,
      });
      newUser.token = generator.createToken(newUser.id);
      return newUser;
    },
  },
};
