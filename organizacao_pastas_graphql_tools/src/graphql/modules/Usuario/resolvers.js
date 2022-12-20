const { db } = require("../../../db");
const { randomUUID } = require("crypto");

module.exports = {
  Usuario: {
    perfil(obj) {
      console.log("obj", obj);
      return db.perfis.find((item) => item.id === obj.perfil);
    },
    telefone(obj) {
      return obj.telefonefixo;
    },
  },
  Query: {
    usuarios() {
      return db.usuarios;
    },
    usuario(_, args) {
      console.log(args);
      const { id, nome } = args;
      if (id) return db.usuarios.find((item) => item.id === args.id);
      return db.usuarios.find((item) => item.nome === args.nome);
    },
  },

  Mutation: {
    criarUsuario(_, args) {
      const { nome } = args;
      const usuarioexistente = db.usuarios.some((u) => u.nome === nome);
      if (usuarioexistente) {
        throw new Error("usuario existente");
      }
      const novoUsuario = {
        ...args,
        id: randomUUID(),
        perfil: 2,
      };
      db.usuarios.push(novoUsuario);
      return novoUsuario;
    },

    atualizarUsuario(_, { id, nome, telefonefixo }) {
      const usuario = db.usuarios.find((u) => u.id === id);
      const usuarioIndice = db.usuarios.findIndex((u) => u.id === id);

      const usuarioAtualizado = {
        ...usuario,
        nome,
        telefonefixo,
      };

      db.usuarios.splice(usuarioIndice, 1, usuarioAtualizado);
      return usuarioAtualizado;
    },

    deletarUsuario(_, { id }) {
      const usuarioEncontrado = db.usuarios.find((u) => u.id === id);
      const atualizarUsuario = db.usuarios.filter((u) => u.id !== id);
      db.usuarios = atualizarUsuario;

      return !!usuarioEncontrado;
    },
  },
};
