const express = require("express");
const Router = express.Router();
const portfolioController = require("./portfolioController");
const {
  auth,
  isWorker,
  isRecruiter,
} = require("../../middleware/authentication");
const middlewareUpload = require("../../middleware/uploaduser");

Router.post("/", middlewareUpload, portfolioController.postPortfolio);
Router.get("/:user_id", portfolioController.getPortfolioByUserId);
Router.patch("/:id", middlewareUpload, portfolioController.updatePortfolio);
Router.delete("/:id", portfolioController.deletePortfolio);

module.exports = Router;
