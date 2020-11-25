import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./Components/App";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";

import client from "./Apollo-Client/client";
import store from "./Redux/store";

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
