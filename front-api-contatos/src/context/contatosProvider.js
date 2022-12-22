import React, { useState } from 'react';
import MyContext from '../context/ContatosContext';
import { GET_CONTATOS } from '../graphql'
import { gql, useQuery } from "@apollo/client"

function ContatosContextProvider({ children }) {
  // const [state, setState] = useState('');
  const { loading, data } = useQuery(GET_CONTATOS)

  return (

    <MyContext.Provider value={{
      contatos: {
        itens: data ? data.contatos : [], loading
      }
    }}>
      {children}
    </MyContext.Provider>
  )
}

export default ContatosContextProvider;