const express = require("express");
const app = express();
const cors = require("cors");
const { API_VERSION } = require("../config/variables");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Load routes
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");
const adminRoutes = require("./routers/admin");
//Routes
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, adminRoutes);

module.exports = app;
