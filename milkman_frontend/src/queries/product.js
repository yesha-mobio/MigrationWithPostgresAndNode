import { gql } from "apollo-boost";

const getAllProducts = gql`
  query {
    getAllProducts {
      id
      name
      description
      price
    }
  }
`;

const getProductById = gql`
  query($id: ID!) {
    getProductById(id: $id) {
      id
      name
      description
      price
    }
  }
`;

const createProduct = gql`
  mutation($name: String!, $description: String!, $price: Float!) {
    createProduct(name: $name, description: $description, price: $price) {
      id
      name
      description
      price
    }
  }
`;

const deleteProduct = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      price
    }
  }
`;

const updateProduct = gql`
  mutation($id: ID!, $name: String!, $description: String!, $price: Float!) {
    updateBundle(
      id: $id
      name: $name
      description: $description
      price: $price
    ) {
      id
      name
      description
      price
    }
  }
`;

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
