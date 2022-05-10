"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bank.init(
    {
      name_bank: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del banco es requerido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Bank",
      tableName: "banks",
    }
  );
  return Bank;
};
