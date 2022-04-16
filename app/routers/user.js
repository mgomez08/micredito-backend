const express = require("express");
const UserController = require("../controllers/user");
const { validateJWT } = require("../middlewares/validateJWT");

const api = express.Router();

api.post("/user/change-password", validateJWT, UserController.changePassword);
api.post(
  "/user/save-personal-info",
  validateJWT,
  UserController.savePersonalInfo
);
api.get("/user/get-personal-info", validateJWT, UserController.getPersonalInfo);
api.post(
  "/user/save-financial-info",
  validateJWT,
  UserController.saveFinancialInfo
);
api.get(
  "/user/get-financial-info",
  validateJWT,
  UserController.getFinancialInfo
);

module.exports = api;
