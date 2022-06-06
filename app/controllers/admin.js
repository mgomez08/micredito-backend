const { User } = require("../models/index");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "active"],
    });
    if (!users) {
      return res.status(404).send({
        ok: false,
        msg: "No se encontraron usuarios",
      });
    }
    return res.status(200).send({
      ok: true,
      msg: "Usuarios encontrados",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error al obtener usuarios",
    });
  }
};

const changeActiveStatusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    if (active === undefined || !id) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los datos son obligatorios",
      });
    }
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "active"],
    });
    if (!user) {
      return res.status(404).send({
        ok: false,
        msg: "No se encontró el usuario",
      });
    }
    await user.update({ active });
    return res.status(200).send({
      ok: true,
      msg: "Usuario actualizado",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error al actualizar usuario",
    });
  }
};

module.exports = {
  getAllUsers,
  changeActiveStatusUser,
};
