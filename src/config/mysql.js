const mysql = require("mysql2");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "clover-hire",
});

connection.connect((err) => {
	if (err) {
		console.log("Failed to connect database...", err.message);
	} else {
		console.log("Successfully connect database...");
	}
});

module.exports = connection;
