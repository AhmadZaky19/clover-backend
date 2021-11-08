const connection = require("../../config/mysql");

module.exports = {
  postPortfolioCreate: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO portfolio SET ?", data, (err, result) => {
        if (!err) {
          const newResult = {
            // id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        }
      });
    }),
  getPortfolioByUserId: (user_id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM portfolio WHERE user_id = ?",
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
  getPortfolioById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM portfolio WHERE id = ?",
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
  updatePortfolio: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE portfolio SET ? WHERE id = ?",
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
  deletePortfolio: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM portfolio WHERE id = ?", id, (error) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
