const express = require("express");

const Router = express.Router();

const authController = require("./authController");
// const middlewareAuth = require("../../middleware/auth");
// const middlewareRedis = require("../../middleware/redis");

Router.get("/activate-email/:id/:token", authController.activateEmail);
Router.post("/register/pekerja", authController.registerPekerja);
Router.post("/register/perekrut", authController.registerPerekrut);
Router.post("/login", authController.login);

module.exports = Router;
