import React, { useState } from "react";
import MyContext from "../../context/ContatosContext";
// import { GET_CONTATOS } from "../../graphql";

const valorInicial = { nome: "", email: "", telefone: "" };

export default function Form() {
  // const [inputs, setInputs] = useState(valorInicial);
  const { contatos } = React.useContext(MyContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (contatos.isEdited) {
      contatos.atualizarContato({
        variables: contatos.inputs,
      });
      contatos.setIsEdited(false);
    } else {
      contatos.criarContato({
        variables: contatos.inputs, // objeto {nome: 'TAMIRES SOUSA BATISTA', email: 'tamireshc@ail.com', telefone: '3187191833'}
        // refetchQueries: [{ query: GET_CONTATOS }], // outra forma de dar reload na pagia apos a add
      });
      // contatos.refetch(); //atualiza a pagina apos a adicao de um novo contato
    }
    contatos.setInputs(valorInicial);
  }

  function handleChange(input) {
    contatos.setInputs({
      ...contatos.inputs,
      [input.target.name]: input.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          onChange={handleChange}
          name="nome"
          value={contatos.inputs.nome}
        />
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          type="text"
          onChange={handleChange}
          name="email"
          value={contatos.inputs.email}
        />
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          type="text"
          onChange={handleChange}
          name="telefone"
          value={contatos.inputs.telefone}
        />
      </div>

      <div className="form-group">
        {contatos.isEdited ? (
          <button type="submit" className="btn btn-primary btn-block">
            Editar
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-block">
            Adicionar
          </button>
        )}
      </div>
    </form>
  );
}
