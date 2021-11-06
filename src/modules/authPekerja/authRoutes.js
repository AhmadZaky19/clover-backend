const express = require("express");

const Router = express.Router();

const authController = require("./authController");
// const middlewareAuth = require("../../middleware/auth");
// const middlewareRedis = require("../../middleware/redis");

Router.post("/register", authController.register);
Router.post("/login", authController.login);

module.exports = Router;
