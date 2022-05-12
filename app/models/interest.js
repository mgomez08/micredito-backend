"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Bank.hasMany(models.Interest, {
        foreignKey: "id_bank",
      });
      models.Interest.belongsTo(models.Bank, {
        foreignKey: "id_bank",
      });
      models.Service.hasMany(models.Interest, {
        foreignKey: "id_service",
      });
      models.Interest.belongsTo(models.Service, {
        foreignKey: "id_service",
      });
    }
  }
  Interest.init(
    {
      tasa_men: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La tasa mensual es requerida",
          },
        },
      },
      tasa_anu: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La tasa anual es requerida",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Interest",
      tableName: "interests",
    }
  );
  return Interest;
};
