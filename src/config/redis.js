const redis = require("redis");
// require("dotenv").config();

// const client = redis.createClient({
// 	host: "127.0.0.1",
// 	port: 6379,
// 	password: "",
// });

// PRODUCTION
const client = redis.createClient();

client.on("connect", () => {
	// eslint-disable-next-line no-console
	console.log("You're now connected db redis...");
});

module.exports = client;
