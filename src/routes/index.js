const express = require("express");
const Router = express.Router();
const usersRouter = require("../modules/users/userRouter");

Router.use("/user", usersRouter);
module.exports = Router;
