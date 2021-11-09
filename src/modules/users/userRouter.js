const express = require("express");
const Router = express.Router();
const userController = require("./userController");
const {
	auth,
	isWorker,
	isRecruiter,
} = require("../../middleware/authentication");

Router.get("/", auth, isRecruiter, userController.helloUser);
Router.post("/hire-pekerja", auth, userController.hirePekerja);
Router.get("/skill/:id", userController.getSkillById)
Router.patch("/skill/:id", userController.updateSkill)
// Router.delete("/skill/:id", userController.deleteSkill)

module.exports = Router;
