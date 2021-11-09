const express = require("express");
const Router = express.Router();
const experienceController = require("./experienceController");

Router.post("/", experienceController.postExperience)
Router.get("/:user_id", experienceController.getExperienceByUserId)
Router.patch("/:id", experienceController.updateExperience)
Router.delete("/:id", experienceController.deleteExperience)
module.exports = Router;
