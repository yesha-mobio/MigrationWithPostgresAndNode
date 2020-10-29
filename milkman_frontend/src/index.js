import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { isAuthenticated } from "./authentication/authentication";

// Apollo Cient Set-Up
const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URI,
  onError: (e) => {
    console.log(e);
  },
  request: (operation) => {
    const { token } = isAuthenticated();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "123",
      },
    });
  },
  // credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
