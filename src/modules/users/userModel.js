const connection = require("../../config/mysql");

module.exports = {
	postHirePekerja: (data) =>
		new Promise((resolve, reject) => {
			connection.query("INSERT INTO hire SET ?", data, (error, results) => {
				if (!error) {
					const newResults = {
						...data,
					};
					resolve(newResults);
				} else {
					reject(new Error(`Message ${error.message}`));
				}
			});
		}),
};
