const express = require("express");
const Router = express.Router();
const userController = require("./userController");
const {
  auth,
  isWorker,
  isRecruiter,
} = require("../../middleware/authentication");

// Router.get("/", auth, isRecruiter, userController.helloUser);
Router.get("/", userController.getAllUser);
Router.get("/:id", userController.getUserById);
Router.post("/hire-pekerja", auth, userController.hirePekerja);
module.exports = Router;
