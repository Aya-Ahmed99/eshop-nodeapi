const { body, param, query } = require("express-validator");

module.exports.addProductValidation = [
	body("name").isString().withMessage("Name is not vaild"),

	body("description")
		.isString()
		.withMessage("description should be characters only"),

	body("richDescription")
		.optional()
		.isString()
		.withMessage("richDescription should be characters only"),

	body("image").isString().withMessage("invaild image name"),

	body("image[*]").optional().isString().withMessage("invaild image name"),

	body("brand").optional().isString().withMessage("invaild brand name"),

	body("price").isInt().withMessage("invaild price value"),

	body("category").isInt().withMessage("category Should be Number"),

	body("countInStock").isInt().withMessage("invaild countInStock value"),

	body("rating").optional().isInt().withMessage("invaild rating value"),

	body("numReviews").optional().isInt().withMessage("invaild numReviews value"),

	body("isFeatured")
		.optional()
		.isBoolean()
		.withMessage("invaild isFeatured value"),

	body("color").optional().isString().withMessage("invaild color value"),
];

module.exports.productValidation = [
	param("_id").isMongoId().withMessage("product id should be object id  "),
];

module.exports.productUpdateValidation = [
	param("_id").isMongoId().withMessage("product id should be object id  "),
	body("name").optional().isString().withMessage("Name is not vaild"),

	body("description")
		.optional()
		.isString()
		.withMessage("description should be characters only"),

	body("richDescription")
		.optional()
		.isString()
		.withMessage("richDescription should be characters only"),

	body("image").optional().isString().withMessage("invaild image name"),

	body("image[*]").optional().isString().withMessage("invaild image name"),

	body("brand").optional().isString().withMessage("invaild brand name"),

	body("price").optional().isInt().withMessage("invaild price value"),

	body("category").optional().isInt().withMessage("category Should be Number"),

	body("countInStock")
		.optional()
		.isInt()
		.withMessage("invaild countInStock value"),

	body("rating").optional().isInt().withMessage("invaild rating value"),

	body("numReviews").optional().isInt().withMessage("invaild numReviews value"),

	body("isFeatured")
		.optional()
		.isBoolean()
		.withMessage("invaild isFeatured value"),

	body("color").optional().isString().withMessage("invaild color value"),
];
