const express = require("express");
const controller = require("./../Controller/productController");
const authorization = require("./../Core/Authorization/authorization");
const {
	addProductValidation,
	productValidation,
	productUpdateValidation,
} = require("./../Core/Validations/productsValidation");
const multer = require("multer");

const ProductRouter = express.Router();

const FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValid = FILE_TYPE_MAP[file.mimetype];
		let uploadError = new Error("invalid image type");

		if (isValid) {
			uploadError = null;
		}
		cb(uploadError, "public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}`);
	},
});

const uploadOptions = multer({ storage: storage });

ProductRouter.route("/products").post(
	authorization.checkAdmin,
	addProductValidation,
	uploadOptions.single("image"),
	controller.addProduct
);

ProductRouter.delete(
	"/products/:id",
	authorization.checkAdmin,
	productValidation,
	controller.deleteProductById
);
ProductRouter.patch(
	"/products/:id",
	authorization.checkAdmin,
	productUpdateValidation,
	uploadOptions.single("image"),
	controller.updateProdcutById
);

module.exports = ProductRouter;
