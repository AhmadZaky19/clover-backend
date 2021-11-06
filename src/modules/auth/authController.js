module.exports = {
	activateEmail: async function (request, response) {
		try {
			response.send("Activate Email...");
		} catch (error) {
			console.log(error.message);
		}
	},
};
