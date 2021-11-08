const helperResponse = require("../../helper/wrapper");
const userModel = require("./userModel");
const { hireInvitation } = require("../../helper/email/nodemailer");
const deleteFile = require("../../helper/uploads");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const redis = require("../../config/redis");

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

	getAllUser: async (req, res) => {
		try {
			let {
				page,
				limit,
				searchSkill,
				sortByName,
				sortBySkill,
				sortByLocation,
				jobStatus,
			} = req.query;

			page = Number(page) || 1;
			limit = Number(limit) || 4;
			sortByName = sortByName || "nama ASC";
			searchSkill = searchSkill || "";
			jobStatus = jobStatus || "";

			let offset = page * limit - limit;
			const totalData = await userModel.getCountUser(searchSkill, jobStatus);
			const totalPage = Math.ceil(totalData / limit);

			if (totalPage < page) {
				offset = 0;
				page = 1;
			}

			const pageInfo = {
				page,
				totalPage,
				limit,
				totalData,
			};

			const result = await userModel.getAllUser(
				limit,
				offset,
				searchSkill,
				jobStatus,
				sortByName,
				sortBySkill,
				sortByLocation
			);

			const newResult = result.map((item) => {
				const newSkill = item.skill.split(", ");

				const newData = {
					...item,
					skill: newSkill,
				};

				return newData;
			});

			if (result.length < 1) {
				return helperResponse.response(res, 404, `Data not found !`, null);
			}

			redis.setex(
				`getUser:${JSON.stringify(req.query)}`,
				3600,
				JSON.stringify({ result, pageInfo })
			);

			helperResponse.response(
				res,
				200,
				"Success Get All Users Data!",
				newResult,
				pageInfo
			);
		} catch (error) {
			helperResponse.response(res, 400, `Bad Request : ${error}`, null);
		}
	},

	getUserById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await userModel.getUserById(id);

			if (result.length < 1) {
				return helperResponse.response(
					res,
					404,
					`User by id ${id} not found !`,
					null
				);
			}

			redis.setex(`getUser:${id}`, 3600, JSON.stringify(result));

			helperResponse.response(res, 200, "Success Get User By Id", result);
		} catch (error) {
			helperResponse.response(res, 400, `Bad Request : ${error}`, null);
		}
	},

	updateUser: async (req, res) => {
		try {
			const { id } = req.decodeToken;
			const {
				nama,
				email,
				perusahaan,
				bidangPerusahaan,
				jobDesk,
				jobStatus,
				noHandPhone,
				skill,
				domisili,
				description,
				instagram,
				github,
				gitlab,
				linkedin,
			} = req.body;

			const user = await userModel.getUserById(id);
			if (user.length < 1) {
				return helperResponse.response(
					res,
					404,
					`User by id ${id} not found`,
					null
				);
			}

			const setData = {
				nama,
				email,
				perusahaan,
				bidangPerusahaan,
				jobDesk,
				jobStatus,
				noHandPhone,
				skill,
				domisili,
				description,
				instagram,
				github,
				gitlab,
				linkedin,
				updatedAt: new Date(Date()),
			};

			Object.keys(setData).forEach((property) => {
				if (!setData[property]) {
					delete setData[property];
				}
			});

			const result = await userModel.updateUser(setData, id);

			return helperResponse.response(
				res,
				200,
				`Success update profile`,
				result
			);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request : ${error.message}`,
				null
			);
		}
	},

	updateImage: async (req, res) => {
		try {
			const { id } = req.decodeToken;

			const user = await userModel.getUserById(id);
			if (user.length < 1) {
				return helperResponse.response(
					res,
					404,
					`User by id ${id} not found`,
					null
				);
			}

			if (user[0].image) {
				deleteFile(`public/uploads/user/${user[0].image}`);
			}

			const setData = {
				image: req.file ? req.file.filename : null,
				updatedAt: new Date(Date()),
			};

			const result = await userModel.updateUser(setData, id);
			return helperResponse.response(
				res,
				200,
				"Success update image user",
				result
			);
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request : ${error.message}`,
				null
			);
		}
	},

	updatePassword: async (req, res) => {
		try {
			const { id } = req.decodeToken;
			const { newPassword, confirmPassword } = req.body;

			const user = await userModel.getUserById(id);
			if (user.length < 1) {
				return helperResponse.response(
					res,
					404,
					`User by id ${id} not found`,
					null
				);
			}

			if (newPassword !== confirmPassword) {
				return helperResponse.response(
					res,
					400,
					`Password does not match`,
					null
				);
			}

			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(newPassword, salt);

			const setData = { password: passwordHash };

			const result = await userModel.updateUser(setData, id);

			return helperResponse.response(res, 200, `Success update password`, {
				id: result.id,
			});
		} catch (error) {
			return helperResponse.response(
				res,
				400,
				`Bad request : ${error.message}`,
				null
			);
		}
	},

	postExperience: async (req, res) => {
		try {
			const { body } = req;
			const setData = { id: uuid(), ...body };
			const result = await userModel.postExperience(setData);
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
	getExperienceByUserId: async (req, res) => {
		try {
			const { user_id } = req.params;
			const result = await userModel.getExperienceByUserId(user_id);
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
	getExperienceById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await userModel.getExperienceById(id);
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
