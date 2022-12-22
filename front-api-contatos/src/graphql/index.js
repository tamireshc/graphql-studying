import { gql, useQuery } from "@apollo/client"

export const GET_CONTATOS = gql`
  query{
    contatos{
      id nome email telefone
    }
  }`
