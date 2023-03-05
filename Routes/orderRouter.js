const express = require("express");
const authorization = require("./../Core/Authorization/authorization");
const controller = require("./../Controller/orderController");
const checkValidations = require("./../Core/Validations/checkValidations");
const orderValidations = require("./../Core/Validations/orderValidation");
const orderRouter = express.Router();

orderRouter
	.route("/orders")
	.get(authorization.checkAdmin, controller.getAllOrders)
	.post(
		authorization.checkUser,
		orderValidations.addOrderValidation,
		checkValidations,
		controller.addOrder
	);
orderRouter.delete(
	"/orders/:id",
	authorization.checkAdmin,
	orderValidations.orderValidation,
	checkValidations,
	controller.deleteById
);

orderRouter.get(
	"/orders/:id",
	authorization.checkAdminAndUser,
	orderValidations.orderValidation,
	checkValidations,
	controller.getOrderById
);

orderRouter.patch(
	"/orders/:id",
	authorization.checkAdmin,
	orderValidations.orderUpdateValidation,
	checkValidations,
	controller.updateOrderById
);

orderRouter.get("/totalsales", authorization.checkAdmin, controller.totalSales);

module.exports = orderRouter;
