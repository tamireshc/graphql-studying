const db = require("../db");
const NoPermissionError = require("../errors/NoPermissionError");
const TaskNotFoundError = require("../errors/taskNotFoundError");

class TasksRegisterServices {
  async getTasks(user_id) {
    return await db("tasks").where({ user_id });
  }

  async getTaskById(user_id, id) {
    const task = await db("tasks").where({ id }).first();
    console.log("task", task);
    if (!task) throw new TaskNotFoundError("Tarefa não encontrada");
    if (task.user_id != user_id)
      throw new NoPermissionError("Você não tem permissão");

    return task;
  }

  async addTask(user_id, data) {
    return await (
      await db("tasks")
        .insert({ user_id, ...data })
        .returning("*")
    )[0];
  }

  async deleteTask(user_id, id) {
    await this.getTaskById(user_id, id);
    return await db("tasks").where({ id }).delete();
  }

  async updateTask(user_id, id, data) {
    console.log("id", id);
    console.log("iduser", user_id);
    await this.getTaskById(user_id, id);
    return await (
      await db("tasks").where({ id }).update(data).returning("*")
    )[0];
  }
}

module.exports = new TasksRegisterServices();
