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
};
