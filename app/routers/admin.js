const express = require("express");
const AdminController = require("../controllers/admin");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

const api = express.Router();

api.get("/admin/getUsers", validateJWT, isAdmin, AdminController.getAllUsers);
api.put(
  "/admin/change-active-user/:id",
  validateJWT,
  isAdmin,
  AdminController.changeActiveStatusUser
);

module.exports = api;
