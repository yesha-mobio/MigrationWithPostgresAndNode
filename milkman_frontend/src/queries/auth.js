import { gql } from "apollo-boost";

const register = gql`
  mutation(
    $name: String!
    $email: String!
    $address: String!
    $password: String!
    $role_id: ID!
  ) {
    register(
      name: $name
      email: $email
      address: $address
      password: $password
      role_id: $role_id
    ) {
      user {
        id
        name
        email
        address
        roles {
          name
        }
      }
    }
  }
`;

const signin = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role_id
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

export { register, signin, signout };
