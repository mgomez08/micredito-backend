const { User } = require("../models/index");
const { comparePassword, hashPassword } = require("../utils/bcrypt");

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

module.exports = {
  changePassword,
};
