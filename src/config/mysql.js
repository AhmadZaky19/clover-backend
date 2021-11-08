const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clover_hire",
});

connection.connect((err) => {
  if (err) {
    console.log("Failed to connect database...", err.message);
  } else {
    console.log("Successfully connect database...");
  }
});

module.exports = connection;
