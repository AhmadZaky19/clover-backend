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
	getSkillById: (id) =>
		new Promise((resolve, reject) => {
			connection.query(
				'SELECT skill FROM users WHERE id = ?',
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
	updateSkill: (data, id) =>
		new Promise((resolve, reject) => {
			connection.query(
				'UPDATE users SET skill = ?  WHERE id = ?',
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
	// deleteSkill: (id) =>
	// 	new Promise((resolve, reject) => {
	// 		connection.query(
	// 			'DELETE FROM users WHERE id = ?', id, (error) => {
	// 				if (!error) {
	// 					resolve(id);
	// 				} else {
	// 					reject(new Error(`SQL : ${error.sqlMessage}`));
	// 				}
	// 			});
	// 	})
};
