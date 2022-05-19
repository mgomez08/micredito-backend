const express = require("express");
const BankController = require("../controllers/bank");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

const api = express.Router();

api.post("/bank/", validateJWT, isAdmin, BankController.createBank);
api.put("/bank/:id", validateJWT, isAdmin, BankController.editBank);
api.delete("/bank/:id", validateJWT, isAdmin, BankController.deleteBank);
api.get("/bank", validateJWT, isAdmin, BankController.getAllBanks);
api.get("/bank/:id", validateJWT, isAdmin, BankController.getBank);

module.exports = api;
