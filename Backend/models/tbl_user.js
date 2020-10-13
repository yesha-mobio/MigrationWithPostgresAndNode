"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // tbl_user.hasOne(models.tbl_bundle, {
      //   foreignKey: "created_by",
      //   as: "userBundleCreatedBy",
      // });
      // tbl_user.hasOne(models.tbl_bundle, {
      //   foreignKey: "updated_by",
      //   as: "userBundleUpdatedBy",
      // });
      // tbl_user.hasOne(models.tbl_product, {
      //   foreignKey: "created_by",
      //   as: "userProductCreatedBy",
      // });
      // tbl_user.hasOne(models.tbl_product, {
      //   foreignKey: "updated_by",
      //   as: "userProductUpdatedBy",
      // });
      // tbl_user.hasOne(models.tbl_bundle_product, {
      //   foreignKey: "created_by",
      //   as: "userBundleProductCreatedBy",
      // });
      // tbl_user.hasOne(models.tbl_bundle_product, {
      //   foreignKey: "updated_by",
      //   as: "userBundleProductUpdatedBy",
      // });
      tbl_user.belongsTo(models.tbl_role, {
        foreignKey: "role_id",
        as: "roles",
      });
      // define association here
    }
  }
  tbl_user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_user",
    }
  );
  return tbl_user;
};
