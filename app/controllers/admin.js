const { User } = require("../models/index");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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

module.exports = {
  getAllUsers,
};
