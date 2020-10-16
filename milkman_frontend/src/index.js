import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Apollo Cient Set-Up
const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URI,
});

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
