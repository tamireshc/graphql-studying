module.exports = {
  db: {
    usuarios: [
      {
        id: 1,
        nome: "Paulo",
        telefonefixo: 1233444,
        perfil: 1,
      },
      {
        id: 2,
        nome: "Tom",
        telefonefixo: 1233444,
        perfil: 2,
      },
    ],

    perfis: [
      { id: 1, descricao: "ADM" },
      { id: 2, descricao: "NORMAL" },
    ],

    produtos: [
      { id: 1, nome: "notebook", preco: 200 },
      { id: 2, nome: "tv", preco: 200 },
    ],
  },
};
