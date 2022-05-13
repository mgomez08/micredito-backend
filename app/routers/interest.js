const express = require("express");
const InterestController = require("../controllers/interest");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

const api = express.Router();

api.post("/interest/", validateJWT, isAdmin, InterestController.createInterest);
api.put("/interest/:id", validateJWT, isAdmin, InterestController.editInterest);
api.delete(
  "/interest/:id",
  validateJWT,
  isAdmin,
  InterestController.deleteInterest
);
api.get("/interest", validateJWT, isAdmin, InterestController.getAllInterests);

module.exports = api;
