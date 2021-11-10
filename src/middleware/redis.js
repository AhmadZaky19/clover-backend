const redis = require("../config/redis");
const helperWrapper = require("../helper/wrapper");

module.exports = {
	getUserRedis: (req, res, next) => {
		redis.get(`getUser:${JSON.stringify(req.query)}`, (err, result) => {
			if (!err && result !== null) {
				console.log("Data ada didalam redis");
				const newResultData = JSON.parse(result);
				return helperWrapper.response(
					res,
					200,
					"Success get data user",
					newResultData.newResult,
					newResultData.pageInfo
				);
			}
			console.log("Data tidak ada didalam redis");
			next();
		});
	},

	getUserByIdRedis: (req, res, next) => {
		const { id } = req.params;

		redis.get(`getUser:${id}`, (err, result) => {
			if (!err && result !== null) {
				console.log("Data ada didalam redis");
				const newResult = JSON.parse(result);
				return helperWrapper.response(
					res,
					200,
					"Success Get User By Id",
					newResult
				);
			}
			console.log("Data tidak ada didalam redis");
			next();
		});
	},

	clearUserRedis: (req, res, next) => {
		redis.keys("getUser:*", (err, result) => {
			if (result.length > 0) {
				result.forEach((item) => {
					redis.del(item);
				});
			}
			next();
		});
	},
};
