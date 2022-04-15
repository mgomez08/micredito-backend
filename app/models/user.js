"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre es requerido",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El apellido es requerido",
          },
        },
      },
      date_birth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            msg: "La fecha de nacimiento no es valida",
          },
        },
      },
      depart_birth: {
        type: DataTypes.STRING(40),
        validate: {
          isAlpha: {
            msg: "El departamento de nacimiento solo puede contener letras",
          },
        },
      },
      city_birth: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: {
            msg: "La ciudad de nacimiento solo puede contener letras",
          },
        },
      },
      type_doc: {
        type: DataTypes.STRING(11),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El tipo de documento es requerido",
          },
          isAlpha: {
            msg: "El tipo de documento solo puede contener letras",
          },
        },
      },
      num_doc: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El numero de documento es requerido",
          },
          isNumeric: {
            msg: "El numero de documento solo puede contener numeros",
          },
        },
      },
      tel: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El celular es requerido",
          },
          isNumeric: {
            msg: "El celular solo puede contener numeros",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER(3),
        validate: {
          isNumeric: {
            msg: "La edad solo puede contener numeros",
          },
        },
      },
      marital_status: {
        type: DataTypes.STRING(20),
        validate: {},
      },
      edu_level: {
        type: DataTypes.STRING(20),
        validate: {
          isAlpha: {
            msg: "El nivel de estudio solo puede contener letras",
          },
        },
      },
      profession: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: {
            msg: "La profesion solo puede contener letras",
          },
        },
      },
      occupation: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: {
            msg: "La ocupacion solo puede contener letras",
          },
        },
      },
      num_per_family_ncl: {
        type: DataTypes.INTEGER(3),
        validate: {
          isNumeric: {
            msg: "El numero de personas en la familia debe ser un numero",
          },
        },
      },
      num_per_depen: {
        type: DataTypes.INTEGER(3),
        validate: {
          isNumeric: {
            msg: "El numero de personas dependientes debe ser un numero",
          },
        },
      },
      type_housing: {
        type: DataTypes.STRING(20),
        validate: {
          isAlpha: {
            msg: "El tipo de vivienda solo puede contener letras",
          },
        },
      },
      depart_resi: {
        type: DataTypes.STRING(40),
        validate: {
          isAlpha: {
            msg: "El departamento de residencia solo puede contener letras",
          },
        },
      },
      city_resi: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: {
            msg: "La ciudad de residencia solo puede contener letras",
          },
        },
      },
      home_address: {
        type: DataTypes.STRING(100),
        validate: {},
      },
      years_resi: {
        type: DataTypes.INTEGER(3),
        validate: {
          isNumeric: {
            msg: "La cantidad de años en la residencia actual debe ser un numero",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El correo es requerido",
          },
          isEmail: {
            msg: "El correo no es valido",
          },
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El estado es requerido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La contraseña es requerida",
          },
          min: {
            args: 6,
            msg: "La contraseña debe tener al menos 6 caracteres",
          },
        },
      },
      form_progress: {
        type: DataTypes.INTEGER(3),
        validate: {
          isNumeric: {
            msg: "El progreso del formulario debe ser un numero",
          },
        },
      },
      scoring: {
        type: DataTypes.FLOAT,
        validate: {
          isNumeric: {
            msg: "El puntaje debe ser un numero",
          },
        },
      },
      years_experience: {
        type: DataTypes.INTEGER(2),
        validate: {
          isNumeric: {
            msg: "Los años de experiencia laboral deben ser un número",
          },
        },
      },
      date_current_job: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            msg: "La fecha de ingreso al actual trabajo debe ser una fecha valida",
          },
        },
      },
      work_position: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: {
            msg: "El puesto de trabajo solo debe tener letras",
          },
        },
      },
      type_salary: {
        type: DataTypes.STRING(11),
        validate: {
          isAlpha: {
            msg: "El tipo de salario solo debe tener letras",
          },
        },
      },
      type_contract: {
        type: DataTypes.STRING(30),
        validate: {
          isAlpha: {
            msg: "El tipo de contrato solo debe tener letras",
          },
        },
      },
      total_assets: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El total de activos debe ser un número",
          },
        },
      },
      monthly_salary: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El salario mensual debe ser un número",
          },
        },
      },
      additional_income: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El ingreso adicional debe ser un número",
          },
        },
      },
      total_monthly_income: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El total mensual de ingresos debe ser un número",
          },
        },
      },
      monthly_expenditure: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El gasto mensual debe ser un número",
          },
        },
      },
      have_credits: {
        type: DataTypes.STRING(3),
        validate: {
          isAlpha: {
            msg: "El campo de si tiene créditos solo debe tener letras",
          },
        },
      },
      amount_credit_acquired: {
        type: DataTypes.INTEGER(4),
        validate: {
          isNumeric: {
            msg: "El monto de crédito adquirido debe ser un número",
          },
        },
      },
      days_past_due: {
        type: DataTypes.INTEGER(1),
        validate: {
          isNumeric: {
            msg: "Los días de mora deben ser un número",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
