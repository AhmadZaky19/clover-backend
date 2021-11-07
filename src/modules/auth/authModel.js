const connection = require("../../config/mysql");

module.exports = {
	register: (data) =>
		new Promise((resolve, reject) => {
			connection.query("INSERT INTO users SET ?", data, (error, result) => {
				if (!error) {
					const newResult = {
						id: result.insertId,
						...data,
					};
					delete newResult.password;
					resolve(newResult);
				} else {
					reject(new Error(`SQL : ${error.sqlMessage}`));
				}
			});
		}),
	postRegisterPerekrut: (data) =>
		new Promise((resolve, reject) => {
			connection.query("INSERT INTO users SET ?", data, (error, results) => {
				if (!error) {
					const newData = {
						...data,
					};
					delete newData.password;
					resolve(newData);
				} else {
					reject(new Error(`Message: ${error.message}`));
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
	activateEmailUser: (status, id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"UPDATE users SET status = ? WHERE id = ?",
				[status, id],
				(error, results) => {
					if (!error) {
						const setNewData = {
							id,
							status,
						};
						resolve(setNewData);
					} else {
						reject(new Error(`Message : ${error.message}`));
					}
				}
			);
		}),
};
