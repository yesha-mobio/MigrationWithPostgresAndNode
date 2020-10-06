"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_bundle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tbl_bundle.belongsTo(models.tbl_user, {
        foreignKey: "created_by",
        as: "bundleCreatedBy",
      });
      tbl_bundle.belongsTo(models.tbl_user, {
        foreignKey: "updated_by",
        as: "bundleUpdatedBy",
      });
      tbl_bundle.belongsToMany(models.tbl_product, {
        foreignKey: "bundle_id",
        through: "tbl_bundle_product",
        as: "bundleProducts",
      });
      // define association here
    }
  }
  tbl_bundle.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_bundle",
    }
  );
  return tbl_bundle;
};
