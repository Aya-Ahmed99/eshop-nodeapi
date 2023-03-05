const { Product } = require("./../Models/productModel");
const { Category } = require("./../Models/catigoryModel");

module.exports.addProduct = async (req, res, next) => {
	try {
		console.log(req.body.category);
		const category = await Category.findById(req.body.category);
		if (!category) throw new Error("Category not exist");

		const file = req.file;
		if (!file) throw new Error("image not exist");

		const fileName = file.filename;
		const basePath = `/public/uploads/`;

		let product = new Product({
			name: req.body.name,
			description: req.body.description,
			richDescription: req.body.richDescription,
			image: `${basePath}${fileName}`,
			brand: req.body.brand,
			price: req.body.price,
			category: req.body.category,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
			isFeatured: req.body.isFeatured,
			color: req.body.color,
		});

		product = await product.save();

		if (!product) throw new Error("Data Of Product in valid");

		res.status(201).json({ success: true, Data: product });
	} catch (error) {
		next(error);
	}
};

module.exports.updateProdcutById = async (req, res, next) => {
	try {
		const category = await Category.findById(req.body.category);

		if (!category) throw new Error("Invalid Category");

		const file = req.file;
		if (!file) throw new Error("image not exist");

		const fileName = file.filename;
		console.log(fileName);
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				description: req.body.description,
				richDescription: req.body.richDescription,
				image: `/public/uploads/${fileName}`,
				brand: req.body.brand,
				price: req.body.price,
				category: req.body.category,
				countInStock: req.body.countInStock,
				rating: req.body.rating,
				numReviews: req.body.numReviews,
				isFeatured: req.body.isFeatured,
				color: req.body.color,
			},
			{ new: true }
		);

		if (!product) throw new Error("the product cannot be updated!");

		res.status(200).json({ success: true, Data: product });
	} catch (error) {
		next(error);
	}
};

module.exports.deleteProductById = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndRemove(req.params.id);
		if (product) {
			res
				.status(200)
				.json({ success: true, message: "the product is deleted!" });
		} else {
			throw new Error("product not found!");
		}
	} catch (error) {
		next(error);
	}
};
