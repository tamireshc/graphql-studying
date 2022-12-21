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
        return userFound;
      }

      const { login: loginGit, avatar_url } =
        await dataSources.githubService.getUser(login);
      console.log(loginGit, avatar_url);
      return await dataSources.userRegisterService.addUser({
        login: loginGit,
        avatar_url,
      });
    },
  },
};
