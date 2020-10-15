import { gql } from "apollo-boost";

const getAllBundleProducts = gql`
  query {
    getAllBundleProducts {
      id
      bundle_id
      product_id
      products {
        id
        name
        description
        price
      }
      bundles {
        id
        name
        description
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
      products {
        id
        name
        description
        price
      }
      bundles {
        id
        name
        description
      }
    }
  }
`;

const createBundleProduct = gql`
  mutation($bundle_id: ID!, $product_id: ID!) {
    createBundleProduct($bundle_id: ID!, $product_id: ID!){
        id
        bundle_id
        product_id
        created_At
        updated_At
        products {
          id
          name
          description
          price
          created_At
          updated_At
        }
        bundles {
          id
          name
          description
          created_At
          updated_At
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
      created_At
      updated_At
      products {
        id
        name
        description
        price
        created_At
        updated_At
      }
      bundles {
        id
        name
        description
        created_At
        updated_At
      }
    }
  }
`;

const updateBundleProduct = gql`
  mutation($id: ID!, $bundle_id: ID!, $product_id: ID!) {
    updateBundleProduct($id: ID!, $bundle_id: ID!, $product_id: ID!){
        id
        bundle_id
        product_id
        created_At
        updated_At
        products {
          id
          name
          description
          price
          created_At
          updated_At
        }
        bundles {
          id
          name
          description
          created_At
          updated_At
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
