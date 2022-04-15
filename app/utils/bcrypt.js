const { ROUNDS } = require("../../config/variables");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
