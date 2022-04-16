const { User, Sequelize } = require("../models/index");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { format, parseISO, differenceInYears } = require("date-fns");

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
      !userObj.num_per_family_ncl ||
      !userObj.num_per_depen ||
      !userObj.type_housing ||
      !userObj.depart_resi ||
      !userObj.city_resi ||
      !userObj.home_address ||
      !userObj.years_resi
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
    if (user.dataValues.datebirth !== "0000-00-00") {
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
    if (user.dataValues.datebirth === "0000-00-00") {
      user.dataValues.datebirth = null;
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
    console.log(userObj);
    if (
      !userObj.years_experience ||
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

    if (user.dataValues.datecurrentjob !== "0000-00-00") {
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
    if (user.dataValues.datecurrentjob === "0000-00-00") {
      user.dataValues.datecurrentjob = null;
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
            `SUM((date_birth = '0000-00-00') +(depart_birth = '') +(city_birth = '') +(age IS NULL) +(marital_status = '') +(edu_level = '') +(profession = '') +(occupation = '') +(num_per_family_ncl IS NULL) +(num_per_depen IS NULL) +(type_housing = '') +(depart_resi = '') +(city_resi = '') +(home_address = '') +(years_resi IS NULL) + IFNULL((years_experience IS NULL) +(date_current_job = '0000-00-00') + +(work_position = '') +(type_salary = "") +(type_contract = '') +(total_assets IS NULL) +(monthly_salary IS NULL) +(additional_income IS NULL) +(total_monthly_income IS NULL) +(monthly_expenditure IS NULL),7))`
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
module.exports = {
  changePassword,
  savePersonalInfo,
  getPersonalInfo,
  saveFinancialInfo,
  getFinancialInfo,
  getColumnsNull,
};
