const express = require("express");
const controller = require("../Controller/userController");
const userValidation = require("./../Core/Validations/userValidation");
const checkValidations = require("./../Core/Validations/checkValidations");
const authorization = require("../Core/Authorization/authorization");

const userRoute = express.Router();

userRoute
	.route("/users")
	.get(authorization.checkAdmin, controller.getAllUsers)
	.patch(
		authorization.checkUser,
		userValidation.updateUserValidation,
		checkValidations,
		controller.updateUser
	)
	.delete(
		authorization.checkAdmin,
		userValidation.deleteUserValidation,
		checkValidations,
		controller.deleteUser
	);
userRoute.get(
	"/users/:id",
	authorization.checkAdminAndUser,
	userValidation.getUserByIdValidation,
	checkValidations,
	controller.getUserById
);
module.exports = userRoute;
