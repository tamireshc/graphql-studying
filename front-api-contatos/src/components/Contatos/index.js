import React from "react";
import Item from "../Item";
import MyContext from "../../context/ContatosContext"

// import data from "../../data";


function Contatos() {
  const { contatos } = React.useContext(MyContext)


  if (contatos.loading) return <div className="contatos">Carregando...
  </div>
  return (
    <div className="contatos">
      {contatos.itens.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
}

export default Contatos;
