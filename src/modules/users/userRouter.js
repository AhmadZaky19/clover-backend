const express = require("express");
const Router = express.Router();
const userController = require("./userController");

Router.get("/", userController.helloUser);
Router.post("/hire-pekerja", userController.hirePekerja);
module.exports = Router;
