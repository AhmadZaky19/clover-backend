const express = require("express");
const Router = express.Router();
const authController = require("./authController");
const { auth } = require("../../middleware/authentication");

Router.get("/activate-email/:id/:token", authController.activateEmail);
Router.post("/register/pekerja", authController.registerPekerja);
Router.post("/register/perekrut", authController.registerPerekrut);
Router.post("/login", authController.login);
Router.post("/callback/forgot-password", authController.calbackForgotPassword);
Router.get("/forgot-password/:id/:token", authController.callbackEmail);
Router.patch("/forgot-password/:id/:token", authController.forgotPassword);
Router.post("/logout", auth, authController.logout);
module.exports = Router;
