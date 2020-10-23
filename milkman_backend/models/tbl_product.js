"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // tbl_product.belongsTo(models.tbl_user, {
      //   foreignKey: "created_by",
      //   as: "productCreatedBy",
      // });
      // tbl_product.belongsTo(models.tbl_user, {
      //   foreignKey: "updated_by",
      //   as: "productUpdatedBy",
      // });
      tbl_product.hasMany(models.tbl_bundle_product, {
        foreignKey: "id",
      });
      // define association here
    }
  }
  tbl_product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      // image: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_product",
    }
  );
  return tbl_product;
};
