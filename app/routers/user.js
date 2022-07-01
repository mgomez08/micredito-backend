const express = require("express");
const UserController = require("../controllers/user");
const validateJWT = require("../middlewares/validateJWT");

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
api.get("/user/get-columns-nulls", validateJWT, UserController.getColumnsNull);
api.post(
  "/user/save-form-progress",
  validateJWT,
  UserController.saveFormProgress
);
api.get("/user/get-form-progress", validateJWT, UserController.getFormProgress);
api.post(
  "/user/save-scoring-info",
  validateJWT,
  UserController.saveScoringInfo
);
api.get("/user/get-scoring-info", validateJWT, UserController.getScoringInfo);
api.get(
  "/user/calculate-scoring",
  validateJWT,
  UserController.calculateScoring
);
api.get("/user/get-bank-services", validateJWT, UserController.getBankServices);

module.exports = api;
