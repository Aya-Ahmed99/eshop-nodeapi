const { body, param } = require("express-validator");

module.exports.addOrderValidation = [
	body("orderItems[*]").isObject().withMessage("order items are not vaild"),
	body("shippingAddress1")
		.isString()
		.withMessage("shippingAddress1 should be string"),

	body("shippingAddress2")
		.optional()
		.isString()
		.withMessage("shippingAddress2 should be string"),

	body("city").isString().withMessage("city should be string"),

	body("zip").isString().withMessage("zip code should be string"),

	body("country").isString().withMessage("country should be string"),

	body("phone").isMobilePhone().withMessage("invaild phone number"),

	body("status").optional().isString().withMessage("status should be string"),
];

module.exports.orderValidation = [
	param("id").isMongoId().withMessage("order id should be object id  "),
];

module.exports.orderUpdateValidation = [
	param("id").isMongoId().withMessage("order id should be object id  "),
	body("status").isString().withMessage("status should be string"),
];
