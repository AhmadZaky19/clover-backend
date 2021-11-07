const helperWrapper = require("../helper/wrapper");
const jwt = require("jsonwebtoken");
module.exports = {
	auth: (request, response, next) => {
		let token = request.headers.authorization;

		if (!token) {
			return helperWrapper.response(response, 403, "Login First...");
		}
		token = token.split(" ")[1];

		jwt.verify(token, "RAHASIA", (error, results) => {
			if (error) {
				return helperWrapper.response(response, 403, error.message);
			} else {
				request.decodeToken = results;
				next();
			}
		});
	},
	isWorker: (request, response, next) => {
		const user = request.decodeToken;
		if (user.role !== "Pekerja") {
			return helperWrapper.response(response, 403, "You dont have permission!");
		} else {
			next();
		}
	},
	isRecruiter: (request, response, next) => {
		const user = request.decodeToken;
		if (user.role !== "Perekrut") {
			return helperWrapper.response(response, 403, "You dont have permission!");
		} else {
			next();
		}
	},
};
