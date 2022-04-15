const { SECRET_KEY, EXPIRES_IN } = require("../../config/variables");
const jwt = require("jsonwebtoken");
const { getUnixTime, addDays } = require("date-fns");

const generateAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.id_rol,
      active: user.active,
      createToken: getUnixTime(new Date()),
      exp: getUnixTime(addDays(new Date(), EXPIRES_IN)),
    };
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token, intente de nuevo.");
      }
      resolve(token);
    });
  });
};

const generateRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      exp: getUnixTime(addDays(new Date(), 30)),
    };
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token, intente de nuevo.");
      }
      resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        reject("No se pudo verificar el token, intente de nuevo.");
      }
      resolve(decoded);
    });
  });
};

const willExpiredToken = (token) => {
  const result = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      reject("No se pudo verificar el token, intente de nuevo.");
    }
    if (getUnixTime(new Date()) >= decoded.exp) {
      return { isTokenExpired: true, token: decoded };
    } else {
      return { isTokenExpired: false, token: decoded };
    }
  });
  return result;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  willExpiredToken,
};
