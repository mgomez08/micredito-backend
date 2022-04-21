const { User } = require("../models/index");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  willExpiredToken,
} = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const userObj = {
      type_doc: req.body.typedoc,
      num_doc: req.body.numdoc,
      name: req.body.names,
      lastname: req.body.lastname,
      email: req.body.email.toLowerCase(),
      tel: req.body.tel,
      id_rol: 1,
      active: 1,
      password: req.body.password,
    };
    if (
      !userObj.type_doc ||
      !userObj.num_doc ||
      !userObj.name ||
      !userObj.lastname ||
      !userObj.email ||
      !userObj.tel ||
      !userObj.password
    ) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if (userObj.password.length < 6) {
      return res.status(400).send({
        ok: false,
        msg: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (userObj.password !== req.body.passwordRepeat) {
      return res.status(400).send({
        ok: false,
        msg: "Las contraseñas no coinciden",
      });
    }

    const user = await User.findOne({
      where: {
        email: userObj.email,
      },
      attributes: ["email"],
    });

    if (user) {
      return res.status(400).send({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    userObj.password = await hashPassword(userObj.password);

    const newUser = await User.create(userObj);

    delete newUser.dataValues.password;

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      user: newUser.dataValues,
    });
  } catch (error) {
    res.status(400).send({
      ok: false,
      msg: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
      attributes: ["id", "email", "password", "active", "id_rol"],
    });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "El correo no está registrado",
      });
    }

    if (user.active === 0) {
      return res.status(400).send({
        ok: false,
        msg: "El usuario no está activo",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        msg: "La contraseña no es correcta",
      });
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return res.status(200).json({
      ok: true,
      msg: "Usuario autenticado correctamente",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send({
        ok: false,
        msg: "No se envió el token",
      });
    }
    const { isTokenExpired, token } = willExpiredToken(refreshToken);
    if (isTokenExpired) {
      return res.status(400).send({
        ok: false,
        msg: "El token ha expirado",
      });
    }
    const user = await User.findOne({
      where: {
        id: token.id,
      },
      attributes: ["id", "email", "active", "id_rol"],
    });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "No se encontró el usuario",
      });
    }

    if (user.active === 0) {
      return res.status(400).send({
        ok: false,
        msg: "El usuario no está activo",
      });
    }

    const accessToken = await generateAccessToken(user);

    return res.status(200).json({
      ok: true,
      msg: "Token renovado correctamente",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al renovar el token",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  refreshAccessToken,
};
