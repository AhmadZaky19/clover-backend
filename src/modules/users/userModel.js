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
	getAllUser: (limit, offset, searchSkill, jobStatus, sortByName) =>
		new Promise((resolve, reject) => {
			connection.query(
				`SELECT * FROM users WHERE COALESCE(skill, '') LIKE '%${searchSkill}%' AND COALESCE(jobStatus, '') LIKE '%${jobStatus}%' ORDER BY ${sortByName} LIMIT ? OFFSET ?`,
				[limit, offset],
				(error, results) => {
					if (!error) {
						resolve(results);
					} else {
						reject(new Error(`Message ${error.message}`));
					}
				}
			);
		}),
	getCountUser: (searchSkill, jobStatus) =>
		new Promise((resolve, reject) => {
			connection.query(
				`SELECT COUNT(*) AS total FROM users WHERE COALESCE(skill, '') LIKE '%${searchSkill}%' AND COALESCE(jobStatus, '') LIKE '%${jobStatus}%'`,
				(error, results) => {
					if (!error) {
						resolve(results[0].total);
					} else {
						reject(new Error(`Message ${error.message}`));
					}
				}
			);
		}),
	getUserById: (id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM users WHERE id = ?",
				id,
				(error, results) => {
					if (!error) {
						const newResults = results;
						delete newResults[0].password;
						resolve(newResults);
					} else {
						reject(new Error(`Message ${error.message}`));
					}
				}
			);
		}),
	updateUser: (data, id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"UPDATE users SET ? WHERE id = ?",
				[data, id],
				(error, results) => {
					if (!error) {
						const newResult = {
							id,
							...data,
						};
						resolve(newResult);
					} else {
						reject(new Error(`Message ${error.message}`));
					}
				}
			);
		}),
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
	postExperience: (data) =>
		new Promise((resolve, reject) => {
			connection.query("INSERT INTO experience SET ?", data, (err, result) => {
				if (!err) {
					const newResult = {
						id: result.insertId,
						...data,
					};
					resolve(newResult);
				} else {
					reject(new Error(`SQL : ${err.sqlMessage}`));
				}
			});
		}),
	getExperienceByUserId: (user_id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM experience WHERE user_id = ?",
				user_id,
				(error, result) => {
					if (!error) {
						resolve(result);
					} else {
						reject(new Error(`SQL : ${error.sqlMessage}`));
					}
				}
			);
		}),
	getExperienceById: (id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"SELECT * FROM experience WHERE id = ?",
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
	updateExperience: (data, id) =>
		new Promise((resolve, reject) => {
			connection.query(
				"UPDATE experience SET ? WHERE id = ?",
				[data, id],
				(error) => {
					if (!error) {
						const newResult = {
							id,
							...data,
						};
						resolve(newResult);
					} else {
						reject(new Error(`SQL : ${error.sqlMessage}`));
					}
				}
			);
		}),
	deleteExperience: (id) =>
		new Promise((resolve, reject) => {
			connection.query("DELETE FROM experience WHERE id = ?", id, (error) => {
				if (!error) {
					resolve(id);
				} else {
					reject(new Error(`SQL : ${error.sqlMessage}`));
				}
			});
		}),
};
