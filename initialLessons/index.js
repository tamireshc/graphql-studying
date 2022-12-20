const { gql, ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const usuarios = [
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
];

const perfis = [
  { id: 1, descricao: "ADM" },
  { id: 2, descricao: "NORMAL" },
];

const produtos = [
  { id: 1, nome: "notebook", preco: 200 },
  { id: 2, nome: "tv", preco: 200 },
];

const resolvers = {
  Usuario: {
    perfil(obj) {
      console.log("obj", obj);
      return perfis.find((item) => item.id === obj.perfil);
    },

    telefone(obj) {
      return obj.telefonefixo;
    },
  },

  Query: {
    usuarios() {
      return usuarios;
    },
    usuario(_, args) {
      console.log(args);
      const { id, nome } = args;
      if (id) return usuarios.find((item) => item.id === args.id);
      return usuarios.find((item) => item.nome === args.nome);
    },

    perfis() {
      return perfis;
    },

    produtos() {
      return produtos;
    },
  },
};

const typeDefs = gql`
  type Produto {
    id: ID
    nome: String
    preco: Int
  }

  type Usuario {
    idade: Int
    salario: Float
    nome: String
    ativo: Boolean
    id: ID
    tecnologias: [String]!
    telefone: Int
    perfil: Perfil
  }

  type Perfil {
    id: Int
    descricao: String
  }
  type Query {
    usuarios: [Usuario]
    usuario(id: Int, nome: String): Usuario
    produtos: [Produto]
    perfis: [Perfil]
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: 4002 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4002`)
);
