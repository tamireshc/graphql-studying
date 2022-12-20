

module.exports = {
  Query: {
    contatos: async (obj, args, context, info) => {
      console.log(context.UsuariocadastroService)
     

      
    }
  },
  Mutation: {
    criarContato: async (_, { data }) =>
     await usuariocadastroService.criarContato(data),

    atualizarContato: async (_, { id, data }) =>
      await usuariocadastroService.atualizarContato( id, data ),

    deletarContato: async (_, { filtro }) => await usuariocadastroService.deletarContato(filtro)

    // uso
    // mutation{
    //   deletarContato(filtro:{
    //     id:1
    //   })
    // }
  },
};
