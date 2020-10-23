import { gql } from "apollo-boost";

const signin = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const signout = gql`
  query {
    signout {
      id
      name
      email
    }
  }
`;

export { signin, signout };
