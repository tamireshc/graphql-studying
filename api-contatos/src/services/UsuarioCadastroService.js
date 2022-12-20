const db = require("../db");

class UsuariocadastroService {
  contatos = async () => await db("contatos");

  criarContato = async (data) =>
    await (
      await db("contatos").insert(data).returning("*")
    )[0];

  atualizarContato = async (id, data) =>
    await (
      await db("contatos").where({ id }).update(data).returning("*")
    )[0];

  deletarContato = async (filtro) => {
    if (filtro.id) {
      return await db("contatos").where({ id: filtro.id }).delete();
    }
    if (filtro.email) {
      return await db("contatos").where({ email: filtro.email }).delete();
    }
    throw new Error("favor passar um parametro");
  };

  // uso
  // mutation{
  //   deletarContato(filtro:{
  //     id:1
  //   })
  // }
}

module.exports = UsuariocadastroService;
