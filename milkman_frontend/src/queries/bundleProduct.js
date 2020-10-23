import { gql } from "apollo-boost";

const getAllBundleProducts = gql`
  query {
    getAllBundleProducts {
      id
      bundle_id
      product_id
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      bundles {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const getBundleProductById = gql`
  query($id: ID!) {
    getBundleProductById(id: $id) {
      id
      bundle_id
      product_id
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      bundles {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const createBundleProduct = gql`
  mutation($bundle_id: ID!, $product_id: ID!) {
    createBundleProduct(bundle_id: $bundle_id, product_id: $product_id) {
      id
      bundle_id
      product_id
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      bundles {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const deleteBundleProduct = gql`
  mutation($id: ID!) {
    deleteBundleProduct(id: $id) {
      id
      bundle_id
      product_id
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      bundles {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const updateBundleProduct = gql`
  mutation($id: ID!, $bundle_id: ID!, $product_id: ID!) {
    updateBundleProduct(
      id: $id
      bundle_id: $bundle_id
      product_id: $product_id
    ) {
      id
      bundle_id
      product_id
      createdAt
      updatedAt
      products {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      bundles {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export {
  getAllBundleProducts,
  getBundleProductById,
  createBundleProduct,
  deleteBundleProduct,
  updateBundleProduct,
};
