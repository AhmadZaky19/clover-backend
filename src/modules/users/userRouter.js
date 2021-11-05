const express = require("express");
const Router = express.Router();
const userController = require("./userController");

Router.get("/", userController.helloUser);

module.exports = Router;
