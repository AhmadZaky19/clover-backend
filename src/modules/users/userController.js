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
};
