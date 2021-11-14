require("dotenv").config();
const redis = require("redis");
// require("dotenv").config();

// const client = redis.createClient({
// 	host: "127.0.0.1",
// 	port: 6379,
// 	password: "",
// });

// PRODUCTION
const client = redis.createClient({
	host: "redis-17644.c291.ap-southeast-2-1.ec2.cloud.redislabs.com",
	password: "1JG90Us8B2fpZQAyKnczWp7Z9gLwv9Ox",
	port: "17644",
});

client.on("connect", () => {
	// eslint-disable-next-line no-console
	console.log("You're now connected db redis...");
});

module.exports = client;
