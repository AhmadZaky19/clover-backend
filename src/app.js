require("dotenv").config();
const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const xss = require("xss-clean");

const RouterNavigation = require("./routes");

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", RouterNavigation);

app.use("*", (request, response) => {
	response.status(404).send("Path not found!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server running running at port ${port}`);
});
