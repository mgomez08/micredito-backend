const { verifyToken } = require("../utils/jwt");
const { getUnixTime } = require("date-fns");

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la cabecera de Autentificación",
      });
    }
    const payload = await verifyToken(token);
    if (payload.exp <= getUnixTime(new Date())) {
      return res.status(401).json({
        ok: false,
        msg: "El token ha expirado",
      });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = validateJWT;
