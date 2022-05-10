"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init(
    {
      name_service: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del servicio es requerido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "services",
    }
  );
  return Service;
};
