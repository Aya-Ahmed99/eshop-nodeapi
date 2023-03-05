const { body, param } = require("express-validator");

module.exports.addUserValidation = [
	body("fullname").isAlpha().withMessage(" fullname should be string"),
	body("password").isString().withMessage(" password should be string"),
	body("email").isEmail().withMessage(" email should be valid email"),
	body("phone")
		.isMobilePhone()
		.withMessage("phone should be valid mobile phone number"),
	body("isAdmin").isBoolean().withMessage("isAdmin should be boolean"),
];
module.exports.updateUserValidation = [
	body("id").isMongoId().withMessage(" id should be objectId"),
	body("fullname")
		.optional()
		.isAlpha()
		.withMessage(" fullname should be string"),
	body("password")
		.optional()
		.isString()
		.withMessage(" password should be string"),
	body("email")
		.optional()

		.isEmail()
		.withMessage(" email should be valid email"),
	body("phone")
		.optional()
		.isMobilePhone()
		.withMessage("phone should be valid mobile phone number"),
];
module.exports.deleteUserValidation = [
	body("id").isMongoId().withMessage(" id should be objectId"),
];
module.exports.getUserByIdValidation = [
	param("id").isMongoId().withMessage(" id should be objectId"),
];
