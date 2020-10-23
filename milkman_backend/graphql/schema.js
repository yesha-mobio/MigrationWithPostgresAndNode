const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar TimeStamp

  type Role {
    id: ID
    name: String
    createdAt: TimeStamp
    updatedAt: TimeStamp
  }

  type User {
    id: ID
    name: String
    email: String
    address: String
    password: String
    role_id: Int
    roles: Role
    token: String
    createdAt: TimeStamp
    updatedAt: TimeStamp
  }

  type Bundle {
    id: ID
    name: String
    description: String
    createdAt: TimeStamp
    updatedAt: TimeStamp
  }

  type Product {
    id: ID
    name: String
    description: String
    price: Float
    createdAt: TimeStamp
    updatedAt: TimeStamp
  }

  type BundleProduct {
    id: ID
    bundle_id: Int
    product_id: Int
    bundles: Bundle
    products: Product
    createdAt: TimeStamp
    updatedAt: TimeStamp
  }

  type RegisterResponse {
    user: User!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    currentUser: User

    getAllRoles: [Role!]!
    getRoleById(id: ID!): Role

    getAllUsers: [User]!
    getUserById(id: ID!): User

    getAllBundles: [Bundle!]!
    getBundleById(id: ID!): Bundle

    getAllProducts: [Product!]!
    getProductById(id: ID!): Product

    getAllBundleProducts: [BundleProduct!]!
    getBundleProductById(id: ID!): BundleProduct

    signout: User
  }

  type Mutation {
    createRole(name: String!): Role
    deleteRole(id: ID!): Role
    updateRole(name: String!, id: ID!): Role

    createUser(
      name: String!
      email: String!
      address: String!
      password: String!
      role_id: ID!
    ): RegisterResponse!
    deleteUser(id: ID!): User
    updateUser(name: String!, email: String!, address: String!, id: ID!): User

    createBundle(name: String!, description: String!): Bundle
    deleteBundle(id: ID!): Bundle
    updateBundle(name: String!, description: String!, id: ID!): Bundle

    createProduct(name: String!, description: String!, price: Float!): Product
    deleteProduct(id: ID!): Product
    updateProduct(
      name: String!
      description: String!
      price: Float!
      id: ID!
    ): Product

    createBundleProduct(bundle_id: ID!, product_id: ID!): BundleProduct
    deleteBundleProduct(id: ID!): BundleProduct
    updateBundleProduct(bundle_id: ID!, product_id: ID!, id: ID!): BundleProduct

    signin(email: String!, password: String!): LoginResponse!
    verifyToken(token: String!): LoginResponse!
  }
`;

module.exports = typeDefs;
