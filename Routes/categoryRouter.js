const express = require("express");
const authorization = require("./../Core/Authorization/authorization");
const controller = require("./../Controller/categoryControll");
const {
	addCategoryValidation,
	idCaregoryValidation,
} = require("./../Core/Validations/categoryValidation");
const CategoryRouter = express.Router();

CategoryRouter.route("/Category").post(
	authorization.checkAdmin,
	addCategoryValidation,
	controller.addCategory
);

CategoryRouter.delete(
	"/Category/:id",
	authorization.checkAdmin,
	idCaregoryValidation,
	controller.deleteCategoryById
);

CategoryRouter.patch(
	"/Category/:id",
	authorization.checkAdmin,
	idCaregoryValidation,
	controller.updateCategoryById
);

module.exports = CategoryRouter;
