const { Error } = require("mongoose");
const { Category } = require("./../Models/catigoryModel");

module.exports.addCategory = async (req, res, next) => {
	try {
		let category = new Category({
			name: req.body.name,
			color: req.body.color,
		});
		category = await category.save();

		if (!category) throw new Error("the category cannot be created!");

		res.status(201).send({ success: true, data: category });
	} catch (error) {
		next(error);
	}
};

module.exports.updateCategories = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.body._id,
			{
				name: req.body.name,
			},
			{ new: true }
		);

		if (!category) throw new Error("the category cannot be created!");

		res.status(200).send({ success: true, data: category });
	} catch (error) {
		next(error);
	}
};

module.exports.updateCategoryById = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
			},
			{ new: true }
		);

		if (!category) throw new Error("the category cannot be created!");

		res.status(200).send({ success: true, data: category });
	} catch (error) {
		next(error);
	}
};

module.exports.deleteCategoryById = async (req, res, next) => {
	try {
		const cat = await Category.findByIdAndRemove(req.params.id);

		if (cat) {
			res
				.status(200)
				.json({ success: true, message: "the category is deleted!" });
		} else {
			throw new Error("category not found!");
		}
	} catch (error) {
		next(error);
	}
};
