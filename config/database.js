const { HOST, USER, PASSWORD, DATABASE, DB_DIALECT } = require("./variables");

module.exports = {
  //Config of DB
  username: USER || "root",
  password: PASSWORD || null,
  database: DATABASE || database_development,
  host: HOST || "127.0.0.1",
  dialect: DB_DIALECT || "mysql",

  //Config Seeds
  seederStorage: "json",
  seederStoragePath: "sequelizeSeeds.json",

  //Config Migrations
  migrationStorage: "json",
  migrationStoragePath: "sequelizeMigrations.json",

  define: {
    underscored: true,
  },
};
