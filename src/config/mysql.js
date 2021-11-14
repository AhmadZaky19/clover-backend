require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.log("Failed to connect database...", err.message);
	} else {
		console.log("Successfully connect database...");
	}
});

module.exports = connection;
