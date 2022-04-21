const { User } = require("../models/index");

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        ok: false,
        msg: "No hay usuario en la cabecera de Autentificación",
      });
    }
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["id", "email", "active", "id_rol"],
    });
    if (!user) {
      return res.status(401).send({
        ok: false,
        msg: "No existe el usuario en la base de datos",
      });
    }
    if (user.id_rol !== 2) {
      return res.status(401).send({
        ok: false,
        msg: "No tiene permisos para realizar esta acción, requiere permisos de administrador",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = isAdmin;
