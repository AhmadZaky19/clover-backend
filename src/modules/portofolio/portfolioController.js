const helperResponse = require("../../helper/wrapper");
const portfolioModel = require("./portfolioModel");
const deleteFile = require("../../helper/upload/deleteFile");
const { v4: uuid } = require("uuid");

module.exports = {
	postPortfolio: async (req, res) => {
		try {
			const { user_id, nama_aplikasi, link_repository } = req.body;
			const setData = {
				id: uuid(),
				user_id,
				nama_aplikasi,
				link_repository,
				image: req.file ? req.file.filename : null,
			};
			console.log(setData);
			const result = await portfolioModel.postPortfolioCreate(setData);
			//   console.log(result);
			return helperResponse.response(res, 200, "Success Create Data", result);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad Request(${error.message})`,
				null
			);
		}
	},
	getPortfolioByUserId: async (req, res) => {
		try {
			const { user_id } = req.params;
			const result = await portfolioModel.getPortfolioByUserId(user_id);
			if (result.length < 1) {
				return helperResponse.response(
					res,
					404,
					`User Id ${user_id} Not Found!`,
					null
				);
			}
			return helperResponse.response(
				res,
				200,
				"Success Get By User Id",
				result
			);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad Request (${error.message})`,
				null
			);
		}
	},
	getPortfolioById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await portfolioModel.getPortfolioById(id);
			if (result.length < 1) {
				return helperResponse.response(
					res,
					404,
					`Data by id ${id} not found!`,
					null
				);
			}
			return helperResponse.response(res, 200, "Success get by id", result);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request (${error.message})`,
				null
			);
		}
	},
	updatePortfolio: async (req, res) => {
		try {
			const { id } = req.params;
			const checkId = await portfolioModel.getPortfolioById(id);
			if (checkId.length < 1) {
				return helperResponse.response(
					res,
					404,
					`Data by id ${id} not found !`,
					null
				);
			}
			const { user_id, nama_aplikasi, link_repository } = req.body;
			const setData = {
				id: uuid(),
				user_id,
				nama_aplikasi,
				link_repository,
				image: req.file ? req.file.filename : null,
				updatedAt: new Date(Date.now()),
			};

			for (const data in setData) {
				if (!setData[data]) {
					delete setData[data];
				}
			}
			if (req.file.filename && checkId[0].image) {
				deleteFile(`../../../public/images/${checkId[0].image}`);
			}

			const result = await portfolioModel.updatePortfolio(setData, id);
			return helperResponse.response(res, 200, "Success update data", result);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request (${error.message})`,
				null
			);
		}
	},
	deletePortfolio: async (req, res) => {
		try {
			const { id } = req.params;
			const checkId = await portfolioModel.getPortfolioById(id);
			if (checkId.length < 1) {
				return helperResponse.response(
					res,
					404,
					`Data by id ${id} not found !`,
					null
				);
			}
			if (checkId[0].image) {
				deleteFile(`../../../public/images/${checkId[0].image}`);
			}
			const result = await portfolioModel.deletePortfolio(id);
			return helperResponse.response(
				res,
				200,
				"Success Delete portfolio",
				result
			);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request (${error.message})`,
				null
			);
		}
	},
};
