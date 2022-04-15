const { User } = require("../models/index");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { format, parseISO } = require("date-fns");

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

module.exports = {
  changePassword,
  savePersonalInfo,
  saveFinancialInfo,
};
