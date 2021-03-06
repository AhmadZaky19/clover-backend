require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
module.exports = {
	sendEmail: (data) =>
		new Promise((resolve, reject) => {
			let transporter = nodemailer.createTransport({
				host: process.env.HOST_SMTP,
				port: 587,
				secure: false,
				auth: {
					user: process.env.EMAIL_AUTH_SMTP,
					pass: process.env.PASS_AUTH_SMTP,
				},
			});

			transporter.use(
				"compile",
				hbs({
					viewEngine: {
						extname: ".html",
						partialsDir: path.resolve("./src/templates/email"),
						defaultLayout: false,
					},
					viewPath: path.resolve("./src/templates/email"),
					extName: ".html",
				})
			);

			const emailOptions = {
				from: '"Clover Hire ☘️" <cloverhire@gmail.com>', // sender email
				to: data.to, // receiver list,
				template: data.template,
				subject: data.subject,
				context: data.data,
			};

			// send email transport object
			transporter.sendMail(emailOptions, (error, info) => {
				if (error) {
					reject(error);
				} else {
					resolve(info);
				}
			});
		}),
	hireInvitation: (data) =>
		new Promise((resolve, reject) => {
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: "test.spam.rino@gmail.com",
					pass: "testdemoapp",
				},
			});

			transporter.use(
				"compile",
				hbs({
					viewEngine: {
						extname: ".html",
						partialsDir: path.resolve("./src/templates/hire"),
						defaultLayout: false,
					},
					viewPath: path.resolve("./src/templates/hire"),
					extName: ".html",
				})
			);

			const hireOptions = {
				from: '"Clover Hire ☘️" <cloverhire@gmail.com>', // sender email
				to: data.to, // receiver list,
				template: data.template,
				subject: data.subject,
				context: data.data,
			};

			// send email transport object
			transporter.sendMail(hireOptions, (error, info) => {
				if (error) {
					reject(error);
				} else {
					console.log(info);
					resolve(info);
				}
			});
		}),

	resetPassword: (data) =>
		new Promise((resolve, reject) => {
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: "test.spam.rino@gmail.com",
					pass: "testdemoapp",
				},
			});

			transporter.use(
				"compile",
				hbs({
					viewEngine: {
						extname: ".html",
						partialsDir: path.resolve("./src/templates/forgot-password"),
						defaultLayout: false,
					},
					viewPath: path.resolve("./src/templates/forgot-password"),
					extName: ".html",
				})
			);

			const emailOptions = {
				from: '"Clover Hire ☘️" <cloverhire@gmail.com>', // sender email
				to: data.to, // receiver list,
				template: data.template,
				subject: data.subject,
				context: data.data,
			};

			// send email transport object
			transporter.sendMail(emailOptions, (error, info) => {
				if (error) {
					reject(error);
				} else {
					resolve(info);
				}
			});
		}),
};
