const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");
const authRouter = require("../modules/auth/authRoutes");

Router.use("/auth", authRouter);
Router.use("/user", usersRouter);

module.exports = Router;
