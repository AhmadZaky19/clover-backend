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
	// getSkillById: (id) =>
	// 	new Promise((resolve, reject) => {
	// 		connection.query(
	// 			'SELECT skill FROM users WHERE id = ?',
	// 			id,
	// 			(error, result) => {
	// 				if (!error) {
	// 					resolve(result);
	// 				} else {
	// 					reject(new Error(`SQL : ${error.sqlMessage}`));
	// 				}
	// 			}
	// 		);
	// 	}),
	// updateSkill: (skill, id) =>
	// 	new Promise((resolve, reject) => {
	// 		connection.query(
	// 			'UPDATE users SET ? WHERE id = ?',
	// 			[skill, id],
	// 			(error) => {
	// 				if (!error) {
	// 					let newResult = {
	// 						id,
	// 						skill,
	// 					};
	// 					resolve(newResult);
	// 				} else {
	// 					reject(new Error(`SQL : ${error.sqlMessage}`));
	// 				}
	// 			}
	// 		);
	// 	}),
	// deleteSkillresult: (id) =>
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
