const { RESTDataSource } = require("@apollo/datasource-rest");
const UserNotFoundError = require("../errors/UserNotFoundError");

class GitHubService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com";
  }
  async getUser(login) {
    try {
      return await this.get(`/users/${login}`);
    } catch (error) {
      console.log(error.extensions.response.status);
      if (error.extensions.response.status === 404) {
        throw new UserNotFoundError("Usuário não Encontrado! " + login);
      }
    }
  }
}

module.exports = new GitHubService();
