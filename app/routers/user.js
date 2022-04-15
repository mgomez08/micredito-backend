const express = require("express");
const UserController = require("../controllers/user");
const { validateJWT } = require("../middlewares/validateJWT");

const api = express.Router();

api.post("/user/change-password", validateJWT, UserController.changePassword);

module.exports = api;
