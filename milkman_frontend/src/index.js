import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";

import client from "./apollo-client/client";
import store from "./redux/store";

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
