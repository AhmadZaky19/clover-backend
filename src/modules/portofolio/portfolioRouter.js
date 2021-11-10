const express = require("express");
const Router = express.Router();
const portfolioController = require("./portfolioController");
const {
	auth,
	isWorker,
	isRecruiter,
} = require("../../middleware/authentication");
const middlewareUpload = require("../../middleware/uploaduser");

Router.post(
	"/",
	auth,
	isWorker,
	middlewareUpload,
	portfolioController.postPortfolio
);
Router.get("/:user_id", portfolioController.getPortfolioByUserId);
Router.patch(
	"/:id",
	auth,
	isWorker,
	middlewareUpload,
	portfolioController.updatePortfolio
);
Router.delete("/:id", auth, isWorker, portfolioController.deletePortfolio);

module.exports = Router;
