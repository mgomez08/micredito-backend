"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Rol.hasMany(models.User, {
        foreignKey: "id_rol",
      });
      models.User.belongsTo(models.Rol, {
        foreignKey: "id_rol",
      });
    }
  }
  Rol.init(
    {
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El rol es requerido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "roles",
    }
  );
  return Rol;
};
