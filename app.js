const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./Routes/userRouter");
const productRoute = require("./Routes/productRouter");
const categoryRoute = require("./Routes/categoryRouter");
const orderRoute = require("./Routes/orderRouter");
const authenticationRoute = require("./Routes/authenticationRoute");
const authorization = require("./Core/Authorization/authorization");
const path = require("path");
const server = express();
let port = process.env.PORT || 8080;

server.use(cors());
server.options("*", cors());

mongoose.set("strictQuery", true);
mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log("DB connected....");
		server.listen(port, () => {
			console.log("server is listening... "+port);
		});
	})
	.catch((error) => {
		console.log("DB Error: " + error);
	});

// logging MW
server.use(morgan("endPoint :url :method - :response-time ms"));

//EndPoints
server.use(express.json());
server.use(
	"/public/uploads",
	express.static(path.join(__dirname + "/public/uploads"))
);
server.use(authenticationRoute);
server.use(authorization);
server.use(userRoute);
server.use(productRoute);
server.use(categoryRoute);
server.use(orderRoute);

// not found MW
server.use((request, response, next) => {
	response.status(404).json({ message: "Page Not Found" });
});

// error MW
server.use((error, request, response, next) => {
	let status = error.status || 500;
	response.status(status).json({ message: error + "" });
});
