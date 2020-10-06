"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tbl_role.hasOne(models.tbl_user, {
        foreignKey: "role_id",
        as: "role",
      });
      // define association here
    }
  }
  tbl_role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_role",
    }
  );
  return tbl_role;
};
