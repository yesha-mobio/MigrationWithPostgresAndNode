import { gql } from "apollo-boost";

const getAllBundles = gql`
  query {
    getAllBundles {
      id
      name
      description
    }
  }
`;

const getBundleById = gql`
  query($id: ID!) {
    getBundleById(id: $id) {
      id
      name
      description
    }
  }
`;

const createBundle = gql`
  mutation($name: String!, $description: String!) {
    createBundle(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const deleteBundle = gql`
  mutation($id: ID!) {
    deleteBundle(id: $id) {
      id
      name
      description
    }
  }
`;

const updateBundle = gql`
  mutation($id: ID!, $name: String!, $description: String!) {
    updateBundle(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export {
  getAllBundles,
  getBundleById,
  createBundle,
  deleteBundle,
  updateBundle,
};
