const express = require("express");
const Router = express.Router();
const userController = require("./userController");
const {
  auth,
  isWorker,
  isRecruiter,
} = require("../../middleware/authentication");
const middlewareMulter = require("../../middleware/multer");

// Router.get("/", auth, isRecruiter, userController.helloUser);
Router.get("/", auth, userController.getAllUser);
Router.get("/:id", auth, userController.getUserById);
Router.patch("/", auth, middlewareMulter, userController.updateUser);
Router.patch(
  "/update-image",
  auth,
  middlewareMulter,
  userController.updateImage
);
Router.patch("/update-password", auth, userController.updatePassword);
Router.post("/hire-pekerja", auth, userController.hirePekerja);
module.exports = Router;
