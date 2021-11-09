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

  getAllUser: (limit, offset, searchSkill, jobStatus, sortByName, role) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE COALESCE(skill, '') LIKE '%${searchSkill}%' AND COALESCE(jobStatus, '') LIKE '%${jobStatus}%' AND role LIKE '%${role}%' ORDER BY ${sortByName} LIMIT ? OFFSET ?`,
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
            // delete newResults[0].password;
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
};
