const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");
const userModel = require("../users/userModel");
const { sendEmail, resetPassword } = require("../../helper/email/nodemailer");

module.exports = {
	registerPekerja: async (req, res) => {
		try {
			const { nama, email, noHandphone, password, confirmPassword } = req.body;

			// PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
			// PROSES ENCRYPT PASSWORD
			const hashPassword = await bcryptjs.hash(password, 10);
			const setData = {
				id: uuidv4(),
				nama,
				email,
				noHandphone,
				password: hashPassword,
				role: "Pekerja",
			};

			if (password === confirmPassword) {
				const result = await authModel.register(setData);
				return helperWrapper.response(res, 200, "success Registred", result);
			} else {
				return helperWrapper.response(res, 404, "pass tidak sama", null);
			}

			//   const setDataEmail = {
			//     to: email,
			//     subject: "email verification !",
			//     template: "email-verification",
			//   };
			//   await sendMail(setDataEmail);
		} catch (error) {
			return helperWrapper.response(
				res,
				400,
				`Bad request (${error.message})`,
				null
			);
		}
	},
	registerPerekrut: async function (request, response) {
		try {
			const {
				nama,
				email,
				perusahaan,
				bidangPerusahaan,
				noHandphone,
				password,
				confirmPassword,
			} = request.body;
			const newPassword = bcryptjs.hashSync(password, 10);
			const setDataPerekrut = {
				id: uuidv4(),
				nama,
				email,
				perusahaan,
				bidangPerusahaan,
				noHandphone,
				password: newPassword,
				role: "Perekrut",
			};
			for (const valueForm in setDataPerekrut) {
				if (setDataPerekrut[valueForm] === "") {
					return helperWrapper.response(
						response,
						409,
						"Field tidak boleh kosong...",
						null
					);
				}
			}

			const dataEmail = setDataPerekrut.email;

			const tokenEmail = jwt.sign({ dataEmail }, "Cl0v3RH1R3", {
				expiresIn: "20s",
			});

			// PROSES SEND EMAIL
			const setDataEmail = {
				to: email,
				subject: "Email Verification",
				template: "index",
				data: {
					field: setDataPerekrut,
					callbackEndPoint: `http://${request.get(
						"host"
					)}/auth/activate-email/${setDataPerekrut.id}/${tokenEmail}`,
				},
			};

			if (password === confirmPassword) {
				await sendEmail(setDataEmail);
				const perekrut = await authModel.postRegisterPerekrut(setDataPerekrut);
				return helperWrapper.response(
					response,
					200,
					"Success Registration!",
					perekrut
				);
			} else {
				return helperWrapper.response(
					response,
					404,
					"password dont match!",
					null
				);
			}
		} catch (error) {
			return helperWrapper.response(
				response,
				400,
				`Bad Request : ${error.message}`
			);
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const checkUser = await userModel.getUserByEmail(email);

			if (checkUser.length < 1) {
				return helperWrapper.response(res, 404, "Email not registed", null);
			}

			const passwordUser = await bcryptjs.compare(
				password,
				checkUser[0].password
			);
			// console.log(checkUser[0]);
			if (!passwordUser) {
				return helperWrapper.response(res, 400, "Wrong password", null);
			}

			// PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
			const payload = checkUser[0];
			delete payload.password;
			const token = jwt.sign({ ...payload }, "RAHASIA", {
				expiresIn: "24h",
			});

			if (checkUser[0].status !== "active") {
				return helperWrapper.response(
					res,
					409,
					"Please activate your email...",
					null
				);
			} else {
				return helperWrapper.response(res, 200, "Success login", {
					id: payload.id,
					token,
				});
			}
		} catch (error) {
			return helperWrapper.response(
				res,
				400,
				`Bad request (${error.message})`,
				null
			);
		}
	},
	activateEmail: async function (request, response) {
		try {
			const { id, token } = request.params;
			console.log(token);
			const statusActive = "active";
			if (!id) {
				return helperWrapper.response(response, 404, "tidak ditemukan!", null);
			}
			jwt.verify(token, "Cl0v3RH1R3", async (error, results) => {
				if (error) {
					return helperWrapper.response(
						response,
						409,
						"Masa waktu aktifasi sudah habis, silahkan refresh aktifasi kembali!",
						null
					);
				} else {
					const users = await authModel.activateEmailUser(statusActive, id);
					return helperWrapper.response(
						response,
						200,
						"Sucessfully Activate Email!",
						users
					);
				}
			});
		} catch (error) {
			return helperWrapper.response(
				response,
				400,
				`Bad Request : ${error.message}`
			);
		}
	},
	calbackForgotPassword: async function (request, response) {
		try {
			const { email } = request.body;
			const user = await userModel.getUserByEmail(email);
			if (user.length < 1) {
				return helperWrapper.response(response, 404, "user not found!", null);
			}
			const key = jwt.sign({ email }, "CL0V3RH1R3", { expiresIn: "1h" });
			const keyUserId = user[0].id;
			const setDataEmail = {
				to: email,
				subject: "Reset Password",
				template: "index",
				data: {
					email,
					callbackEndPoint: `http://${request.get(
						"host"
					)}/auth/forgot-password/${keyUserId}/${key}`,
				},
			};
			await resetPassword(setDataEmail);
			return helperWrapper.response(
				response,
				200,
				"Please Check email, for confirm your email!",
				null
			);
		} catch (error) {
			return helperWrapper.response(
				response,
				400,
				`Bad Request : ${error.message}`
			);
		}
	},
	forgotPassword: async function (request, response) {
		try {
			const { token, id } = request.params;
			const { newPassword, confirmPassword } = request.body;
			jwt.verify(token, "CL0V3RH1R3", async (error, results) => {
				if (error) {
					return helperWrapper.response(
						response,
						403,
						"Waktu aktifasi sudah habis, silahkan aktifasi ulang!",
						null
					);
				} else {
					if (newPassword === confirmPassword) {
						const newPasswordHash = await bcryptjs.hash(confirmPassword, 10);
						const newDataPassword = await authModel.updatePassword(
							newPasswordHash,
							id
						);
						return helperWrapper.response(
							response,
							200,
							"Success Update new Password!",
							newDataPassword
						);
					} else {
						return helperWrapper.response(
							response,
							409,
							"Password dont match!",
							null
						);
					}
				}
			});
		} catch (error) {
			return helperWrapper.response(
				response,
				400,
				`Bad Request : ${error.message}`
			);
		}
	},
};
