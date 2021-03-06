const express = require("express");
const Router = express.Router();
const userController = require("./userController");
const {
  auth,
  isWorker,
  isRecruiter,
} = require("../../middleware/authentication");
const middlewareMulter = require("../../middleware/multer");
const {
  getUserRedis,
  getUserByIdRedis,
  clearUserRedis,
} = require("../../middleware/redis");

Router.get(
  "/",
  auth,
  getUserRedis,
  // isRecruiter,
  userController.getAllUser
);
Router.get("/:id", auth, getUserByIdRedis, userController.getUserById);
Router.patch("/", auth, clearUserRedis, userController.updateUser);
Router.patch(
  "/update-image",
  auth,
  middlewareMulter,
  clearUserRedis,
  userController.updateImage
);
Router.patch(
  "/update-password",
  auth,
  clearUserRedis,
  userController.updatePassword
);
Router.post("/hire-pekerja", auth, isRecruiter, userController.hirePekerja);

module.exports = Router;
