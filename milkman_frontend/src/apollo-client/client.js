import ApolloClient from "apollo-boost";
import { isAuthenticated } from "../authentication/authentication";

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

export default client;
