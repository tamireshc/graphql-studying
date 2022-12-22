import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { client } from "./config/client-graphql"
import ContatosContextProvider from "./context/contatosProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContatosContextProvider>
        <App />
      </ContatosContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
