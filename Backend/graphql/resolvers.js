const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const models = require("../models/index");
require("dotenv").config();

const resolvers = {
  Query: {
    getAllRoles: async (root, args, context) => {
      try {
        return await models.tbl_role.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getRoleById: async (root, { id }, context) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_role.findByPk(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllUsers: async (root, args, context) => {
      try {
        return await models.tbl_user.findAll({
          include: [{ model: models.tbl_role, as: "roles" }],
          // where: { role_id: 3 },
        });
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (root, { id }, context) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_user.findByPk(id, {
            include: [{ model: models.tbl_role, as: "roles" }],
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllBundles: async (root, args, context) => {
      try {
        return await models.tbl_bundle.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getBundleById: async (root, { id }, context) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_bundle.findByPk(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllProducts: async (root, args, context) => {
      try {
        return await models.tbl_product.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getProductById: async (root, { id }, context) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_product.findByPk(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllBundleProducts: async (root, args, context) => {
      try {
        return await models.tbl_bundle_product.findAll({
          include: [
            { model: models.tbl_bundle, as: "bundles" },
            { model: models.tbl_product, as: "products" },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },
    getBundleProductById: async (root, { id }, context) => {
      try {
        return await models.tbl_bundle_product.findByPk(id, {
          include: [
            { model: models.tbl_product, as: "products" },
            { model: models.tbl_bundle, as: "bundles" },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },
    // currentUser: async (root, args, req) => {
    //   try {
    //     if (!req.isAuth) {
    //       throw new Error("Sorry, you're not an authenticated user!");
    //     }
    //     return await models.tbl_user.findOne({ where: { id: user.id } });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  Mutation: {
    createRole: async (root, { name }, context) => {
      try {
        return await models.tbl_role.create({ name });
      } catch (error) {
        console.log(error);
      }
    },
    deleteRole: async (root, { id }, context) => {
      try {
        return await models.tbl_role.destroy({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateRole: async (root, { name, id }, context) => {
      try {
        await models.tbl_role.update({ name }, { where: { id } });
        const updatedRole = await models.tbl_role.findByPk(id);
        return updatedRole;
      } catch (error) {
        console.log(error);
      }
    },
    createUser: async (
      root,
      { name, email, password, address, role_id },
      context
    ) => {
      try {
        const userExists = await models.tbl_user.findOne({ email });
        if (userExists) {
          throw new Error("User is already exists...!!");
        }
        const user = await models.tbl_user.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          address,
          role_id,
        });

        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, { id }, context) => {
      try {
        return await models.tbl_user.destroy({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (root, { name, email, address, id }, context) => {
      try {
        await models.tbl_user.update(
          { name, email, address },
          { where: { id } }
        );
        const updatedUser = await models.tbl_user.findByPk(id, {
          include: [{ model: models.tbl_role, as: "roles" }],
        });
        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    },
    createBundle: async (root, { name, description }, context) => {
      try {
        return await models.tbl_bundle.create({ name, description });
      } catch (error) {
        console.log(error);
      }
    },
    deleteBundle: async (root, { id }, context) => {
      try {
        return await models.tbl_bundle.destroy({
          where: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateBundle: async (root, { name, description, id }, context) => {
      try {
        await models.tbl_bundle.update(
          { name, description },
          { where: { id } }
        );
        const updatedBundle = await models.tbl_bundle.findByPk(id);
        return updatedBundle;
      } catch (error) {
        console.log(error);
      }
    },
    createProduct: async (root, { name, description, price }, context) => {
      try {
        return await models.tbl_product.create({ name, description, price });
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (root, { id }, context) => {
      try {
        return await models.tbl_product.destroy({
          where: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct: async (root, { name, description, price, id }, context) => {
      try {
        await models.tbl_product.update(
          { name, description, price },
          { where: { id } }
        );
        const updatedProduct = await models.tbl_product.findByPk(id);
        return updatedProduct;
      } catch (error) {
        console.log(error);
      }
    },
    createBundleProduct: async (root, { bundle_id, product_id }, context) => {
      try {
        return await models.tbl_bundle_product.create({
          bundle_id,
          product_id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteBundleProduct: async (root, { id }, context) => {
      try {
        return await models.tbl_bundle_product.destroy({
          where: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateBundleProduct: async (
      root,
      { bundle_id, product_id, id },
      context
    ) => {
      try {
        await models.tbl_bundle_product.update(
          { bundle_id, product_id },
          { where: { id } }
        );

        const bundleProduct = models.tbl_bundle_product.findByPk(id, {
          include: [
            { model: models.tbl_bundle, as: "bundles" },
            { model: models.tbl_product, as: "products" },
          ],
        });
        return bundleProduct;
      } catch (error) {
        console.log(error);
      }
    },
    signin: async (root, { email, password }, context) => {
      const user = await models.tbl_user.findOne({ where: { email } });
      if (!user) {
        throw new Error("User does not exists..!!");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log("Incorrect password");
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 }
      );
      return { token, userId: user.id, userEmail: user.email };
    },
  },
};

module.exports = resolvers;
