const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");
const authRouter = require("../modules/auth/authRoutes");
const experienceRouter = require("../modules/experience/experienceRouter")

Router.use("/auth", authRouter);
Router.use("/user", usersRouter);
Router.use("/experience", experienceRouter)

module.exports = Router;
