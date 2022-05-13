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
const bankRoutes = require("./routers/bank");
const serviceRoutes = require("./routers/service");
const interestRoutes = require("./routers/interest");
//Routes
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, adminRoutes);
app.use(`/api/${API_VERSION}`, bankRoutes);
app.use(`/api/${API_VERSION}`, interestRoutes);
app.use(`/api/${API_VERSION}`, serviceRoutes);

module.exports = app;
