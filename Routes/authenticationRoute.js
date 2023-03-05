const express = require("express");
const controller = require("./../Controller/authenticationController");
const userValidation = require("./../Core/Validations/userValidation");
const categoryValidation = require("../Core/Validations/categoryValidation");
const {
	productValidation,
} = require("./../Core/Validations/productsValidation");
const checkValidations = require("./../Core/Validations/checkValidations");
const authenticationRoute = express.Router();

authenticationRoute.post("/login", controller.login);
authenticationRoute.post(
	"/register",
	userValidation.addUserValidation,
	checkValidations,
	controller.register
);
authenticationRoute.get("/Category", controller.getAllCategories);
authenticationRoute.get(
	"/Category/:id",
	categoryValidation.idCaregoryValidation,
	checkValidations,
	controller.getCategoryById
);

authenticationRoute.get("/logout", controller.logout);

authenticationRoute.get("/products", controller.getAllProducts);
authenticationRoute.get("/someProducts", controller.getSomeProduct);
authenticationRoute.get("/pages", controller.numOfPages);
authenticationRoute.get(
	"/products/:id",
	productValidation,
	controller.getProductById
);
module.exports = authenticationRoute;
