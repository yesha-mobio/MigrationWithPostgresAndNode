const resolvers = {
  Query: {
    getAllRoles: async (root, args, { models }) => {
      try {
        return await models.tbl_role.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getRoleById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_role.findByPk(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllUsers: async (root, args, { models }) => {
      try {
        return await models.tbl_user.findAll({
          include: [{ model: models.tbl_role, as: "roles" }],
          // where: { role_id: 3 },
        });
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (root, { id }, { models }) => {
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
    getAllBundles: async (root, args, { models }) => {
      try {
        return await models.tbl_bundle.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getBundleById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_bundle.findByPk(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllProducts: async (root, args, { models }) => {
      try {
        return await models.tbl_product.findAll();
      } catch (error) {
        console.log(error);
      }
    },
    getProductById: async (root, { id }, { models }) => {
      try {
        if (id !== undefined || id !== "") {
          return await models.tbl_product.findByPk(id);
        }
      } catch (error) {
        console.log(error);
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
      } catch (error) {
        console.log(error);
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createRole: async (root, { name }, { models }) => {
      try {
        return await models.tbl_role.create({ name });
      } catch (error) {
        console.log(error);
      }
    },
    deleteRole: async (root, { id }, { models }) => {
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
    updateRole: async (root, { name, id }, { models }) => {
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
      { models }
    ) => {
      try {
        return await models.tbl_user.create({
          name,
          email,
          password,
          address,
          role_id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, { id }, { models }) => {
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
      } catch (error) {
        console.log(error);
      }
    },
    createBundle: async (root, { name, description }, { models }) => {
      try {
        return await models.tbl_bundle.create({ name, description });
      } catch (error) {
        console.log(error);
      }
    },
    deleteBundle: async (root, { id }, { models }) => {
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
    updateBundle: async (root, { name, description, id }, { models }) => {
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
    createProduct: async (root, { name, description, price }, { models }) => {
      try {
        return await models.tbl_product.create({ name, description, price });
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (root, { id }, { models }) => {
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
      } catch (error) {
        console.log(error);
      }
    },
    createBundleProduct: async (
      root,
      { bundle_id, product_id },
      { models }
    ) => {
      try {
        return await models.tbl_bundle_product.create({
          bundle_id,
          product_id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteBundleProduct: async (root, { id }, { models }) => {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
