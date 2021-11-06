const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");
const authPekerjaRoutes = require("../modules/authPekerja/authRoutes");

Router.use("/authpekerja", authPekerjaRoutes);
Router.use("/user", usersRouter);

module.exports = Router;
