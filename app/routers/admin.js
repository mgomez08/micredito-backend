const express = require("express");
const AdminController = require("../controllers/admin");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

const api = express.Router();

api.get("/admin/getUsers", validateJWT, isAdmin, AdminController.getAllUsers);

module.exports = api;