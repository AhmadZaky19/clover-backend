const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");
const portfolioRouter = require("../modules/portofolio/portfolioRouter");
const authRouter = require("../modules/auth/authRoutes");

Router.use("/auth", authRouter);
Router.use("/user", usersRouter);
Router.use("/portfolio", portfolioRouter);

module.exports = Router;
