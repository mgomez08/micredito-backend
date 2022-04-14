const { SECRET_KEY, EXPIRES_IN } = require("../../config/variables");
const jwt = require("jsonwebtoken");
const { getUnixTime, addDays } = require("date-fns");

const generateAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      type_doc: user.type_doc,
      num_doc: user.num_doc,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      tel: user.tel,
      role: user.role,
      active: user.active,
      createToken: getUnixTime(new Date()),
      exp: addDays(getUnixTime(new Date(), EXPIRES_IN)),
    };
    jwt.sign(payload, SECRET_KEY, { EXPIRES_IN }, (err, token) => {
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
      exp: addDays(getUnixTime(new Date(), 30)),
    };
    jwt.sign(payload, SECRET_KEY, { EXPIRES_IN }, (err, token) => {
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
