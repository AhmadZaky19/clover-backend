const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "fwebdev.xyz",
	user: "fw11rino",
	password: "rino1234#",
	database: "fw11rino_cloverhire",
	port: 1234,
});

connection.connect((err) => {
	if (err) {
		console.log("Failed to connect database...", err.message);
	} else {
		console.log("Successfully connect database...");
	}
});

module.exports = connection;
