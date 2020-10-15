import { gql } from "apollo-boost";

const getAllRoles = gql`
  query {
    getAllRoles {
      id
      name
    }
  }
`;

const getRoleById = gql`
  query($id: ID!) {
    getRoleById(id: $id) {
      id
      name
    }
  }
`;

const createRole = gql`
  mutation($name: String!) {
    createRole(name: $name) {
      id
      name
    }
  }
`;

const deleteRole = gql`
  mutation($id: ID!) {
    deleteRole(id: $id) {
      id
      name
    }
  }
`;

const updateRole = gql`
  mutation($id: ID!, $name: String!) {
    updateRole(id: $id, name: $name) {
      id
      name
    }
  }
`;

export { getAllRoles, getRoleById, createRole, deleteRole, updateRole };
