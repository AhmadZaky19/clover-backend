const helperWrapper = require("../helper/wrapper");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
module.exports = {
	auth: (request, response, next) => {
		let token = request.headers.authorization;

		if (!token) {
			return helperWrapper.response(response, 403, "Login First...");
		}
		token = token.split(" ")[1];
		redis.get(`accessToken:${token}`, (error, results) => {
			if (!error && results !== null) {
				return helperWrapper.response(
					response,
					403,
					"Your Token is Destroy, please login back...",
					null
				);
			}
			jwt.verify(token, process.env.JWT_SECRET, (error, results) => {
				if (error) {
					return helperWrapper.response(response, 403, error.message);
				}
				request.decodeToken = results;
				next();
			});
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
