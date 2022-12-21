module.exports = {
  Query: {
    async tasks(_, __, { dataSources, user_id }) {
      console.log(user_id);
      return await dataSources.taskService.getTasks(user_id);
    },
  },

  Mutation: {
    async createTask(_, { data }, { dataSources, user_id }) {
      return await dataSources.taskService.addTask(user_id, data);
    },
    async deleteTask(_, { id }, { dataSources, user_id }) {
      return await dataSources.taskService.deleteTask(user_id, id);
    },

    async updateTask(_, { id, data }, { dataSources, user_id }) {
      return await dataSources.taskService.updateTask(user_id, id, data);
    },
  },
};
