require("dotenv").config();

//VARIABLES API
const API_VERSION = process.env.API_VERSION;

//VARIABLES DATABASE
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT_DB = process.env.PORT_DB;
const DB_DIALECT = process.env.DB_DIALECT;

//VARIABLES JWT AND AUTH
const SECRET_KEY = process.env.AUTH_SECRET_KEY;
const EXPIRES_IN = process.env.AUTH_EXPIRES;
const ROUNDS = parseInt(process.env.AUTH_ROUNDS);

module.exports = {
  API_VERSION,
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  PORT_DB,
  DB_DIALECT,
  SECRET_KEY,
  EXPIRES_IN,
  ROUNDS,
};
