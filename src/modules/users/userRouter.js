const express = require("express");
const Router = express.Router();
const userController = require("./userController");
const {
	auth,
	isWorker,
	isRecruiter,
} = require("../../middleware/authentication");

Router.get("/", auth, isRecruiter, userController.helloUser);
Router.post("/hire-pekerja", auth, isRecruiter, userController.hirePekerja);
module.exports = Router;
