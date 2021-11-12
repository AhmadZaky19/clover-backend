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
			const userLoggedId = request.decodeToken.id;
			const { user_id, tujuan_pesan, pesan } = request.body;
			const setDataHire = { id: uuid(), user_id, tujuan_pesan, pesan };
			const perekrut = await userModel.getUserById(userLoggedId);
			const pekerja = await userModel.getPekerjaById(user_id);
			const emailPekerja = pekerja[0].email;
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
			let setDataToObj;
			perekrut.map((value) => {
				setDataToObj = value;
			});

			const setNewDataHire = {
				perushaan: setDataToObj.perusahaan,
				bidangPerusahaan: setDataToObj.bidangPerusahaan,
				pesan: dataHire.pesan,
				tujuan_pesan: dataHire.tujuan_pesan,
			};

			const optionsDataHire = {
				to: emailPekerja,
				subject:
					"Clover Hire, Congratulations, you have been chosen to be part of our partner company",
				template: "index",
				data: {
					perusahaan: setNewDataHire.perushaan,
					bidangPerusahaan: setNewDataHire.bidangPerusahaan,
					tujuan_pesan: setNewDataHire.tujuan_pesan,
					pesan: setNewDataHire.pesan,
				},
			};
			await hireInvitation(optionsDataHire);

			helperResponse.response(
				response,
				200,
				"Success Send Message to worker!"
				// dataHire
			);
		} catch (error) {
			helperResponse.response(response, 400, `Bad Request : ${error}`, null);
		}
	},

	getAllUser: async (req, res) => {
		try {
			let { page, limit, searchSkill, sortByName, jobStatus, role } = req.query;

			page = Number(page) || 1;
			limit = Number(limit) || 3;
			sortByName = sortByName || "nama ASC";
			searchSkill = searchSkill || "";
			jobStatus = jobStatus || "";
			role = role || "";

			let offset = page * limit - limit;
			const totalData = await userModel.getCountUser(
				searchSkill,
				jobStatus,
				role
			);
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
				role
			);

			if (result.length < 1) {
				return helperResponse.response(res, 404, `Data not found !`, null);
			}

			const newResult = result.map((item) => {
				if (item.skill) {
					const newSkill = item.skill.split(", ");

					const newData = {
						...item,
						skill: newSkill,
					};

					delete newData.password;
					return newData;
				}

				const newData = {
					...item,
					skill: item.skill,
				};

				delete newData.password;
				return newData;
			});

			redis.setex(
				`getUser:${JSON.stringify(req.query)}`,
				3600,
				JSON.stringify({ newResult, pageInfo })
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

			delete result[0].password;

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
};
