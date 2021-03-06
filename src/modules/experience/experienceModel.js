const connection = require("../../config/mysql");

module.exports = {
  postExperience: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO experience SET ?',
        data,
        (err, result) => {
          if (!err) {
            const newResult = {
              id: result.insertId, ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`))
          }
        }
      )
    }),
  getExperienceByUserId: (user_id) =>
    new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM experience WHERE user_id = ?',
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
        'SELECT * FROM experience WHERE id = ?',
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
        'UPDATE experience SET ? WHERE id = ?',
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
  // deleteExperience: (id) =>
  //   new Promise((resolve, reject) => {
  //     connection.query('DELETE FROM experience WHERE id = ?', id, (error) => {
  //       if (!error) {
  //         resolve(id);
  //       } else {
  //         reject(new Error(`SQL : ${error.sqlMessage}`));
  //       }
  //     });
  //   })
}