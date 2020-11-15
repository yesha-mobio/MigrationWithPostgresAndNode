const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

module.exports = {
  Query: {
    getAllRoles: async (root, args, { models }) => {
      try {
        const userRoles = await models.tbl_role.findAll();
        if (!userRoles) {
          throw new Error("There are no Roles...!!");
        }
        return userRoles;
      } catch (err) {
        throw new Error(err);
      }
    },
    getRoleById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_role.findByPk(id);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllUsers: async (root, args, { models }) => {
      try {
        return await models.tbl_user.findAll({
          include: [{ model: models.tbl_role, as: "roles" }],
          // where: { role_id: 3 },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    getUserById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_user.findByPk(id, {
            include: [{ model: models.tbl_role, as: "roles" }],
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllBundles: async (root, args, { models }) => {
      try {
        return await models.tbl_bundle.findAll();
      } catch (err) {
        throw new Error(err);
      }
    },
    getBundleById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_bundle.findByPk(id);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllProducts: async (root, args, { models }) => {
      try {
        return await models.tbl_product.findAll();
      } catch (err) {
        throw new Error(err);
      }
    },
    getProductById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_product.findByPk(id);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllBundleProducts: async (root, args, { models }) => {
      try {
        return await models.tbl_bundle_product.findAll({
          include: [
            { model: models.tbl_bundle, as: "bundles" },
            { model: models.tbl_product, as: "products" },
          ],
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    getBundleProductById: async (root, { id }, { models }) => {
      try {
        return await models.tbl_bundle_product.findByPk(id, {
          include: [
            { model: models.tbl_product, as: "products" },
            { model: models.tbl_bundle, as: "bundles" },
          ],
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    currentUser: async (root, args, { models, user }) => {
      try {
        if (!user) {
          throw new Error("Sorry, you're not an authenticated user!");
        }
        return await models.tbl_user.findOne({ where: { id: user.id } });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createRole: async (root, { name }, { models }) => {
      try {
        if (name === "" || name === undefined) {
          throw new Error("Please Enter the Name");
        }

        const roleExists = await models.tbl_role.findOne({ where: { name } });
        if (roleExists) {
          throw new Error("Role exists...!!");
        }

        return await models.tbl_role.create({ name });
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRole: async (root, { id }, { models }) => {
      try {
        return await models.tbl_role.destroy({
          where: {
            id,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    updateRole: async (root, { name, id }, { models }) => {
      try {
        await models.tbl_role.update({ name }, { where: { id } });
        const updatedRole = await models.tbl_role.findByPk(id);
        return updatedRole;
      } catch (err) {
        throw new Error(err);
      }
    },
    createUser: async (
      root,
      { name, email, password, address, role_id },
      { models, SECRET }
    ) => {
      try {
        if (name === "" || name === undefined) {
          throw new Error("Please enter your Name");
        }

        if (email === "" || email === undefined) {
          throw new Error("Please enter your Email");
        }

        if (password === "" || password === undefined) {
          throw new Error("Please enter Password");
        }

        if (password.length < 6) {
          throw new Error(
            "Password length should be at least 6 character long"
          );
        }

        if (address === "" || address === undefined) {
          throw new Error("Please enter your Address");
        }

        if (role_id === "" || role_id === undefined) {
          throw new Error("Please select your Role");
        }

        const userExists = await models.tbl_user.findOne({
          where: { email },
        });
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

        const token = await jsonwebtoken.sign(
          { user: _.pick(user, ["id", "email", "role_id"]) },
          SECRET,
          {
            expiresIn: "1y",
          }
        );

        const userToken = {
          token: token,
        };
        await models.tbl_user.update(userToken, {
          where: { id: user.id },
        });

        const userData = await models.tbl_user.findOne({
          where: { id: user.id },
          include: [{ model: models.tbl_role, as: "roles" }],
        });

        return { user: userData };
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async (root, { id }, { models }) => {
      try {
        return await models.tbl_user.destroy({
          where: {
            id,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    updateUser: async (root, { name, email, address, id }, { models }) => {
      try {
        await models.tbl_user.update(
          { name, email, address },
          { where: { id } }
        );
        const updatedUser = await models.tbl_user.findByPk(id, {
          include: [{ model: models.tbl_role, as: "roles" }],
        });
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    createBundle: async (root, { name, description }, { models }) => {
      try {
        if (name === "" || name === undefined) {
          throw new Error("Please enter name");
        }

        if (description === "" || description === undefined) {
          throw new Error("Please enter description");
        }

        const bundleExists = await models.tbl_bundle.findOne({
          where: { name },
        });
        if (bundleExists) {
          throw new Error("Bundle already Exists...!!");
        }

        return await models.tbl_bundle.create({ name, description });
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteBundle: async (root, { id }, { models }) => {
      try {
        return await models.tbl_bundle.destroy({
          where: {
            id: id,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    updateBundle: async (root, { name, description, id }, { models }) => {
      try {
        await models.tbl_bundle.update(
          { name, description },
          { where: { id } }
        );
        const updatedBundle = await models.tbl_bundle.findByPk(id);
        return updatedBundle;
      } catch (err) {
        throw new Error(err);
      }
    },
    createProduct: async (root, { name, description, price }, { models }) => {
      try {
        if (name === "" || name === undefined) {
          throw new Error("Please enter Name");
        }

        if (description === "" || description === undefined) {
          throw new Error("Please enter Description");
        }

        if (price === 0) {
          throw new Error("Please enter Price");
        }

        // if (image === "" || image === undefined) {
        //   throw new Error("Plaese select an Image");
        // }

        // const { createReadStream, filename, mimetype, encoding } = image;
        // console.log(filename);
        // createReadStream()
        //   .pipe(createWriteStreame(__dirname + `../public/uploads/${filename}`))
        //   .on("finish", () => resolve(true))
        //   .on("error", () => reject(false));

        const productExists = await models.tbl_product.findOne({
          where: { name },
        });
        if (productExists) {
          throw new Error("Product already Exists...!!");
        }
        // console.log("FILE FILE FILE", image);
        return await models.tbl_product.create({
          name,
          description,
          price,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProduct: async (root, { id }, { models }) => {
      try {
        return await models.tbl_product.destroy({
          where: {
            id: id,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProduct: async (
      root,
      { name, description, price, id },
      { models }
    ) => {
      try {
        await models.tbl_product.update(
          { name, description, price },
          { where: { id } }
        );
        const updatedProduct = await models.tbl_product.findByPk(id);
        return updatedProduct;
      } catch (err) {
        throw new Error(err);
      }
    },
    createBundleProduct: async (
      root,
      { bundle_id, product_id },
      { models }
    ) => {
      try {
        if (bundle_id === "" || bundle_id === undefined) {
          throw new Error("Select a Bundle");
        }

        if (product_id === "" || product_id === undefined) {
          throw new Error("Select a Product");
        }

        return await models.tbl_bundle_product.create({
          bundle_id,
          product_id,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteBundleProduct: async (root, { id }, { models }) => {
      try {
        return await models.tbl_bundle_product.destroy({
          where: {
            id,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    updateBundleProduct: async (
      root,
      { bundle_id, product_id, id },
      { models }
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
      } catch (err) {
        throw new Error(err);
      }
    },
    signin: async (root, { email, password }, { models, SECRET }) => {
      if (email === "" || email === undefined) {
        throw new Error("Please Enter Email");
      }

      if (password === "" || password === undefined) {
        throw new Error("Please Enter Password");
      }

      const user = await models.tbl_user.findOne({
        where: { email },
        include: [{ model: models.tbl_role, as: "roles" }],
      });
      if (!user) {
        throw new Error("User does not exists..!!");
      }

      if (user && user.role_id !== 1) {
        throw new Error("You are not an Admin...!!");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect Password..!!");
      }

      const userToken = {
        token: user.token,
      };

      return { token: userToken.token, user };
    },
  },
};
