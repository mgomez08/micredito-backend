const { User, Sequelize, Bank, Service, Interest } = require("../models/index");
const { Op } = require("sequelize");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { format, parseISO, differenceInYears } = require("date-fns");
const math = require("mathjs");
const {
  convertCredit,
  convertAssets,
  convertExpenditure,
  convertMonthlySalary,
  convertAdditionalIncome,
} = require("../utils/convertValues");
const { calculateCredit } = require("../utils/credit");

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, repeatPassword } = req.body;

    if (!currentPassword || !newPassword || !repeatPassword) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).send({
        ok: false,
        msg: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (newPassword !== repeatPassword) {
      return res.status(400).send({
        ok: false,
        msg: "Las contraseñas no coinciden",
      });
    }

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["password"],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    const validPassword = await comparePassword(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        msg: "La contraseña actual es incorrecta",
      });
    }

    if (newPassword === currentPassword) {
      return res.status(400).send({
        ok: false,
        msg: "La nueva contraseña debe ser diferente a la actual",
      });
    }

    const newPasswordHash = await hashPassword(newPassword);

    await User.update(
      {
        password: newPasswordHash,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al actualizar la contraseña",
    });
  }
};

const savePersonalInfo = async (req, res) => {
  try {
    const userObj = {
      name: req.body.names,
      lastname: req.body.lastname,
      date_birth: format(parseISO(req.body.datebirth), "yyyy-MM-dd"),
      depart_birth: req.body.departbirth,
      city_birth: req.body.citybirth,
      type_doc: req.body.typedoc,
      num_doc: req.body.ndoc,
      tel: req.body.tel,
      age: req.body.age,
      marital_status: req.body.maritalstatus,
      edu_level: req.body.educationallevel,
      profession: req.body.profession,
      occupation: req.body.occupation,
      num_per_family_ncl: req.body.numpersonsfamilynucleus,
      num_per_depen: req.body.numpersonsdependents,
      type_housing: req.body.typehousing,
      depart_resi: req.body.departresidence,
      city_resi: req.body.cityresidence,
      home_address: req.body.homeaddress,
      years_resi: req.body.yearsresidence,
    };
    if (
      !userObj.name ||
      !userObj.lastname ||
      !userObj.date_birth ||
      !userObj.depart_birth ||
      !userObj.city_birth ||
      !userObj.type_doc ||
      !userObj.num_doc ||
      !userObj.tel ||
      !userObj.age ||
      !userObj.marital_status ||
      !userObj.edu_level ||
      !userObj.profession ||
      !userObj.occupation ||
      !userObj.num_per_family_ncl.toString() ||
      !userObj.num_per_depen.toString() ||
      !userObj.type_housing ||
      !userObj.depart_resi ||
      !userObj.city_resi ||
      !userObj.home_address ||
      !userObj.years_resi.toString()
    ) {
      console.log(userObj);
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    await User.update(
      {
        ...userObj,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Información personal actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al actualizar la información personal",
    });
  }
};

const getPersonalInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: [
        ["name", "names"],
        "lastname",
        ["date_birth", "datebirth"],
        ["depart_birth", "departbirth"],
        ["city_birth", "citybirth"],
        ["type_doc", "typedoc"],
        ["num_doc", "ndoc"],
        "tel",
        "age",
        ["marital_status", "maritalstatus"],
        ["edu_level", "educationallevel"],
        "profession",
        "occupation",
        ["num_per_family_ncl", "numpersonsfamilynucleus"],
        ["num_per_depen", "numpersonsdependents"],
        ["type_housing", "typehousing"],
        ["depart_resi", "departresidence"],
        ["city_resi", "cityresidence"],
        ["home_address", "homeaddress"],
        ["years_resi", "yearsresidence"],
      ],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    if (user.dataValues.datebirth !== null) {
      const yearsDate = differenceInYears(
        new Date(),
        parseISO(user.dataValues.datebirth)
      );
      if (yearsDate !== user.dataValues.age) {
        await User.update(
          {
            age: yearsDate,
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );
      }
      user.dataValues.age = yearsDate;
    }

    return res.status(200).send({
      ok: true,
      msg: "Información personal obtenida correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al obtener la información personal",
    });
  }
};

const saveFinancialInfo = async (req, res) => {
  try {
    const userObj = {
      years_experience: req.body.yearsexperience,
      date_current_job: format(parseISO(req.body.datecurrentjob), "yyyy-MM-dd"),
      work_position: req.body.workposition,
      type_salary: req.body.typesalary,
      type_contract: req.body.typecontract,
      total_assets: req.body.totalassets,
      monthly_salary: req.body.monthlysalary,
      additional_income: req.body.additionalincome,
      total_monthly_income: req.body.totalmonthlyincome,
      monthly_expenditure: req.body.monthlyexpenditure,
    };
    if (
      !userObj.date_current_job ||
      !userObj.work_position ||
      !userObj.type_salary ||
      !userObj.type_contract ||
      !userObj.total_assets ||
      !userObj.monthly_salary ||
      !userObj.additional_income ||
      !userObj.total_monthly_income ||
      !userObj.monthly_expenditure
    ) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    await User.update(
      {
        ...userObj,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Información financiera actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al actualizar la información financiera",
    });
  }
};

const getFinancialInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: [
        ["years_experience", "yearsexperience"],
        ["date_current_job", "datecurrentjob"],
        ["work_position", "workposition"],
        ["type_salary", "typesalary"],
        ["type_contract", "typecontract"],
        ["total_assets", "totalassets"],
        ["monthly_salary", "monthlysalary"],
        ["additional_income", "additionalincome"],
        ["total_monthly_income", "totalmonthlyincome"],
        ["monthly_expenditure", "monthlyexpenditure"],
      ],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    if (user.dataValues.datecurrentjob !== null) {
      const yearsDate = differenceInYears(
        new Date(),
        parseISO(user.dataValues.datecurrentjob)
      );
      if (yearsDate !== user.dataValues.yearsexperience) {
        await User.update(
          {
            yearsexperience: yearsDate,
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );
      }
      user.dataValues.yearsexperience = yearsDate;
    }

    return res.status(200).send({
      ok: true,
      msg: "Información financiera obtenida correctamente",
      data: user,
    });
  } catch (error) {}
};

const getColumnsNull = async (req, res) => {
  try {
    const columnsNull = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: [
        [
          Sequelize.literal(
            `SUM((date_birth IS NULL) +(depart_birth IS NULL) +(city_birth IS NULL) +(age IS NULL) +(marital_status IS NULL) +(edu_level IS NULL) +(profession IS NULL) +(occupation IS NULL) +(num_per_family_ncl IS NULL) +(num_per_depen IS NULL) +(type_housing IS NULL) +(depart_resi IS NULL) +(city_resi IS NULL) +(home_address IS NULL) +(years_resi IS NULL) + IFNULL((years_experience IS NULL) +(date_current_job IS NULL) + +(work_position IS NULL) +(type_salary = "") +(type_contract IS NULL) +(total_assets IS NULL) +(monthly_salary IS NULL) +(additional_income IS NULL) +(total_monthly_income IS NULL) +(monthly_expenditure IS NULL),7))`
          ),
          "value",
        ],
      ],
    });
    return res.status(200).send({
      ok: true,
      data: columnsNull,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al obtener las columnas nulas",
    });
  }
};

const saveFormProgress = async (req, res) => {
  try {
    const progress = req.body.progress;
    if (!progress) {
      return res.status(400).send({
        ok: false,
        msg: "El progreso es obligatorio",
      });
    }
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["id"],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    await User.update(
      {
        form_progress: progress,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Progreso de formulario actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al actualizar el progreso de formulario",
    });
  }
};

const getFormProgress = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: [["form_progress", "progress"]],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).send({
      ok: true,
      msg: "Progreso de formulario obtenido correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al obtener el progreso de formulario",
    });
  }
};

const saveScoringInfo = async (req, res) => {
  try {
    const have_credits = req.body.havecredits;
    const amount_credit_acquired = req.body.amountcreditacquired;
    const days_past_due = req.body.dayspastdue;

    if (!have_credits) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    await User.update(
      {
        have_credits,
        amount_credit_acquired,
        days_past_due,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Información de scoring actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al actualizar la información de scoring",
    });
  }
};

const getScoringInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: [
        ["have_credits", "havecredits"],
        ["amount_credit_acquired", "amountcreditacquired"],
        ["days_past_due", "dayspastdue"],
        "scoring",
      ],
    });
    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).send({
      ok: true,
      msg: "Información de scoring obtenida correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener la información de scoring",
    });
  }
};

const calculateScoring = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        ["total_assets", "totalassets"],
        ["monthly_salary", "monthlysalary"],
        ["additional_income", "additionalincome"],
        ["monthly_expenditure", "monthlyexpenditure"],
        ["have_credits", "havecredits"],
        ["amount_credit_acquired", "amountcreditacquired"],
        ["days_past_due", "dayspastdue"],
      ],
      where: {
        [Op.and]: {
          total_assets: {
            [Op.not]: null,
          },
          monthly_salary: {
            [Op.not]: null,
          },
          additional_income: {
            [Op.not]: null,
          },
          monthly_expenditure: {
            [Op.not]: null,
          },
          have_credits: {
            [Op.not]: null,
          },
          amount_credit_acquired: {
            [Op.not]: null,
          },
          days_past_due: {
            [Op.not]: null,
          },
        },
      },
    });
    if (!users) {
      return res.status(400).send({
        ok: false,
        msg: "No se encontraron usuarios",
      });
    }

    let razoncorriente;
    let endeudamiento;
    let razoncorrienteUser;
    let endeudamientoUser;
    let value = 0;
    // dataModel - Conjunto de datos de las razones corrientes y endeudamiento de los usuarios
    const dataModel = [];
    const defaults = [];
    users.map((user) => {
      //razoncorriente = salarioMensual+ingresosAdicionales/egresosMensuales
      razoncorriente =
        (convertMonthlySalary(user.dataValues.monthlysalary) +
          convertAdditionalIncome(user.dataValues.additionalincome)) /
        convertExpenditure(user.dataValues.monthlyexpenditure);
      if (user.dataValues.havecredits === "No") {
        //Si no tiene creditos, el default es 0
        defaults.push([0]);
        //endeudamiento en caso que no tenga creditos es egresosMensuales/activosTotales
        endeudamiento =
          convertExpenditure(user.dataValues.monthlyexpenditure) /
          convertAssets(user.dataValues.totalassets);
      } else if (user.dataValues.havecredits === "Si") {
        //Si tiene credito el endeudamiento es montoCredito/activosTotales
        endeudamiento =
          convertCredit(user.dataValues.amountcreditacquired) /
          convertAssets(user.dataValues.totalassets);
        if (user.dataValues.dayspastdue > 1) {
          //si es > 1 quiere decir que tiene más de 45 días de mora, por lo que entra en default 1
          defaults.push([1]);
        } else {
          //Si no, el default es 0
          defaults.push([0]);
        }
      }
      //En caso de que la razon y el endeudamiento de mayor a 1, se dejará como valor el 1
      razoncorriente > 1 ? (razoncorriente = 1) : razoncorriente;
      endeudamiento > 1 ? (endeudamiento = 1) : endeudamiento;
      //Se agrega la razoncorriente y endeudamiento a la matriz de los datos de los usuarios
      dataModel.push([razoncorriente, endeudamiento]);
      //Como se calculará el scoring de una persona, cuando se encuentren sus datos se almacena su razon corriente y endeudamiento para usarlos más adelante
      if (user.dataValues.id === req.user.id) {
        razoncorrienteUser = razoncorriente;
        endeudamientoUser = endeudamiento;
        if (user.dataValues.havecredits === "No") {
          value = 7;
        }
      }
    });
    //Calcule coefficients - Según el excel
    let tmpResult = math.multiply(math.transpose(dataModel), dataModel);

    tmpResult = math.inv(tmpResult);
    tmpResult = math.multiply(
      math.multiply(tmpResult, math.transpose(dataModel)),
      defaults
    );

    tmpResult =
      razoncorrienteUser * tmpResult[0][0] +
      endeudamientoUser * tmpResult[1][0];

    tmpResult = math.exp(tmpResult);

    const scoring = ((tmpResult / (1 + tmpResult)) * 100 + value).toFixed(2);

    await User.update(
      {
        scoring: scoring,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    return res.status(200).send({
      ok: true,
      msg: "Scoring calculado correctamente",
      data: scoring,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBankServices = async (req, res) => {
  try {
    const data = await Interest.findAll({
      order: [
        [Bank, "name_bank", "ASC"],
        [Service, "name_service", "ASC"],
      ],
      include: [
        {
          model: Service,
          attributes: ["id", "name_service"],
        },
        {
          model: Bank,
          attributes: ["id", "name_bank"],
        },
      ],
    });
    if (!data) {
      return res.status(400).send({
        ok: false,
        msg: "No se encontraron servicios de bancos",
      });
    }
    return res.status(200).send({
      ok: true,
      msg: "Servicios de bancos obtenidos correctamente",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener los servicios de bancos",
    });
  }
};

const simulateCredit = async (req, res) => {
  try {
    const { amount, period, interest } = req.body;
    if (!amount || !period || !interest) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    const dues = calculateCredit({ amount, period, interest });
    return res.status(200).send({
      ok: true,
      msg: "Calculado",
      data: dues,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error al simular el crédito",
    });
  }
};

module.exports = {
  changePassword,
  savePersonalInfo,
  getPersonalInfo,
  saveFinancialInfo,
  getFinancialInfo,
  getColumnsNull,
  saveFormProgress,
  getFormProgress,
  saveScoringInfo,
  getScoringInfo,
  calculateScoring,
  getBankServices,
  simulateCredit,
};
