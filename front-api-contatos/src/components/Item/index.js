import React from "react";
import MyContext from "../../context/ContatosContext";
import { GET_CONTATOS } from "../../graphql";

export default function Item({ item }) {
  const { contatos } = React.useContext(MyContext);
  return (
    <div className="item">
      <h5 className="item-header">
        <a
          href="name"
          className="item-title"
          onClick={(event) => {
            event.preventDefault();
            contatos.setIsEdited(true);
            contatos.setInputs({
              id: item.id,
              nome: item.nome,
              email: item.email,
              telefone: item.telefone,
            });
          }}
        >
          {item.nome}
        </a>
        <button
          type="button"
          className="close"
          onClick={() =>
            contatos.deletarContato({
              variables: { id: item.id },
              refetchQueries: [{ query: GET_CONTATOS }], //atualiza a lista de contatos reload a pagina
            })
          }
        >
          <span>&times;</span>
        </button>
      </h5>
      <div className="item-body">
        <p className="item-text">{item.email}</p>
        <p className="item-text">{item.telefone}</p>
      </div>
    </div>
  );
}
