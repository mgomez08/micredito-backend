const express = require("express");
const ServiceController = require("../controllers/service");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

const api = express.Router();

api.post("/service/", validateJWT, isAdmin, ServiceController.createService);
api.put("/service/:id", validateJWT, isAdmin, ServiceController.editService);
api.delete(
  "/service/:id",
  validateJWT,
  isAdmin,
  ServiceController.deleteService
);
api.get("/service", validateJWT, isAdmin, ServiceController.getAllServices);
api.get("/service/:id", validateJWT, isAdmin, ServiceController.getService);

module.exports = api;
