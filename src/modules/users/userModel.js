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
	getUserByEmail: (email) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE email = ?",
				email,
				(error, result) => {
					if (!error) {
						resolve(result);
					} else {
						reject(new Error(`SQL : ${error.sqlMessage}`));
					}
				}
			);
		}),
	getUserById: (id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE id = ?",
				id,
				(error, result) => {
					if (!error) {
						resolve(result);
					} else {
						reject(new Error(`SQL : ${error.sqlMessage}`));
					}
				}
			);
		}),
	getPekerjaById: (id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE id = ?",
				id,
				(error, results) => {
					if (!error) {
						resolve(results);
					} else {
						reject(new Error(`SQL : ${error.message}`));
					}
				}
			);
		}),
};
