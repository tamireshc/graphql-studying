import React from "react";
import MyContext from "../context/ContatosContext";
import {
  ADD_CONTATO,
  GET_CONTATOS,
  REMOVE_CONTATO,
  ATUALIZAR_CONTATO,
} from "../graphql";
import { useMutation, useQuery } from "@apollo/client";

const valorInicial = { nome: "", email: "", telefone: "" };

function ContatosContextProvider({ children }) {
  const [inputs, setInputs] = React.useState(valorInicial);
  const [isEdited, setIsEdited] = React.useState(false);

  const { loading, data, refetch } = useQuery(GET_CONTATOS);
  const [criarContato] = useMutation(ADD_CONTATO, {
    //alterando os contatos em cache para ter o reload da página
    update(cache, { data }) {
      //esse data é o retorno do update ou seja o novo contato
      const newContatoResponse = data?.criarContato;
      const existingContatos = cache.readQuery({ query: GET_CONTATOS });

      cache.writeQuery({
        query: GET_CONTATOS, //escrevendo a query como a original
        data: {
          contatos: [...existingContatos.contatos, newContatoResponse], //trocando os dados para colocar o novo contato no cache
        },
      });
    },
  });

  const [deletarContato] = useMutation(REMOVE_CONTATO);

  // eslint-disable-next-line no-undef
  const [atualizarContato] = useMutation(ATUALIZAR_CONTATO);

  return (
    <MyContext.Provider
      value={{
        contatos: {
          itens: data ? data.contatos : [],
          loading,
          criarContato,
          refetch,
          deletarContato,
          atualizarContato,
          inputs,
          setInputs,
          isEdited,
          setIsEdited,
        },
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContatosContextProvider;
