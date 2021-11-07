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

  getAllUser: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (error, results) => {
        if (!error) {
          resolve(results);
        } else {
          reject(new Error(`Message ${error.message}`));
        }
      });
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
};
