const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");
const authRouter = require("../modules/auth/authRouter");

Router.use("/user", usersRouter);
Router.use("/auth", authRouter);

module.exports = Router;
