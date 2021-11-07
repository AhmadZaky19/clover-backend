const helperResponse = require("../../helper/wrapper");
const userModel = require("./userModel");
const { hireInvitation } = require("../../helper/email/nodemailer");
const { v4: uuid } = require("uuid");
module.exports = {
	helloUser: async (request, response) => {
		response.send("Helo user!");
	},
	hirePekerja: async function (request, response) {
		try {
			// user_id => decode token after login
			const { user_id, tujuan_pesan, pesan } = request.body;
			const setDataHire = { id: uuid(), user_id, tujuan_pesan, pesan };

			for (const propertyForm in setDataHire) {
				if (setDataHire[propertyForm] === "") {
					return helperResponse.response(
						response,
						409,
						"Lengkapi Form yang kosong...",
						null
					);
				}
			}
			const dataHire = await userModel.postHirePekerja(setDataHire);

			const optionsDataHire = {
				to: "rinosatyaputra.id@gmail.com",
				subject:
					"Clover Hire, Congratulations, you have been chosen to be part of our partner company",
				template: "index",
				data: {
					tujuan_pesan: dataHire.tujuan_pesan,
					pesan: dataHire.pesan,
				},
			};
			console.log(optionsDataHire);
			await hireInvitation(optionsDataHire);

			helperResponse.response(
				response,
				200,
				"Success Send Message to worker!",
				dataHire
			);
		} catch (error) {
			helperResponse.response(response, 400, `Bad Request : ${error}`, null);
		}
	},
	postExperience: async (req, res) => {
		try {
			const { body } = req
			const setData = { id: uuid(), ...body }
			const result = await userModel.postExperience(setData)
			return helperResponse.response(res, 200, "Success Create Data", result)
		}
		catch (error) {
			return helperResponse.response(res, 400, `Bad Request(${error.message})`, null)
		}
	},
	getExperienceByUserId: async (req, res) => {
		try {
			const { user_id } = req.params
			const result = await userModel.getExperienceByUserId(user_id)
			if (result.length < 1) {
				return helperResponse.response(
					res, 404, `User Id ${user_id} Not Found!`, null)
			}
			return helperResponse.response(
				res, 200, 'Success Get By User Id', result)
		} catch (error) {
			return helperResponse.response(
				res, 400, `Bad Request (${error.message})`, null)
		}
	},
	getExperienceById: async (req, res) => {
		try {
			const { id } = req.params
			const result = await userModel.getExperienceById(id)
			if (result.length < 1) {
				return helperResponse.response(
					res, 404, `Data by id ${id} not found!`, null)
			}
			return helperResponse.response(
				res, 200, 'Success get by id', result)
		} catch (error) {
			return helperResponse.response(
				res, 400, `Bad request (${error.message})`, null)
		}
	},
	updateExperience: async (req, res) => {
		try {
			const { id } = req.params;
			const checkId = await userModel.getExperienceById(id);
			if (checkId.length < 1) {
				return helperResponse.response(
					res,
					404,
					`Data by id ${id} not found !`,
					null
				);
			}
			const { body } = req;
			const setData = {
				...body,
				updatedAt: new Date(Date.now()),
			};

			for (const data in setData) {
				if (!setData[data]) {
					delete setData[data];
				}
			}

			const result = await userModel.updateExperience(setData, id);
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
	deleteExperience: async (req, res) => {
		try {
			const { id } = req.params;
			const checkId = await userModel.getExperienceById(id);
			if (checkId.length < 1) {
				return helperResponse.response(
					res,
					404,
					`Data by id ${id} not found !`,
					null
				);
			}
			const result = await userModel.deleteExperience(id);
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
};
