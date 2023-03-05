const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Category } = require("./../Models/catigoryModel");
const { Product } = require("./../Models/productModel");
const UserSchema = mongoose.model("User");
module.exports.login = (request, response, next) => {
	UserSchema.findOne({
		email: request.body.email,
	})
		.then((data) => {
			if (data == null) {
				throw new Error("not");
			} else {
				if (!bcrypt.compareSync(request.body.password, data.password)) {
					throw new Error("pass");
				}
				if (data.isAdmin == true) {
					let token = jwt.sign(
						{
							role: "admin",
							id: data._id,
							userName: data.fullname,
						},
						process.env.SECRETKEY
					);
					response.status(200).json({ data: "login as admin", token });
				} else {
					let token = jwt.sign(
						{
							role: "user",
							id: data._id,
							userName: data.fullname,
						},
						process.env.SECRETKEY
					);
					response.status(200).json({ data: "login as user", token });
				}
			}
		})
		.catch((error) => {
			error.message = "Not Authenticatedkkk";
			error.status = 401;
			next(error);
		});
};
module.exports.register = (request, response, next) => {
	let UserObject = new UserSchema({
		fullname: request.body.fullname,
		password: bcrypt.hashSync(request.body.password, 13),
		email: request.body.email,
		phone: request.body.phone,
		isAdmin: request.body.isAdmin,
	});
	UserObject.save()
		.then((data) => {
			if (data.isAdmin == true) {
				let token = jwt.sign(
					{
						role: "admin",
						id: data._id,
						userName: data.fullname,
					},
					process.env.SECRETKEY
				);
				response.status(201).json({ data, token });
			} else {
				let token = jwt.sign(
					{
						role: "user",
						id: data._id,
						userName: data.fullname,
					},
					process.env.SECRETKEY
				);
				response.status(201).json({ data, token });
			}
		})
		.catch((error) => {
			next(error);
		});
};
module.exports.getAllCategories = async (req, res, next) => {
	try {
		const categoryList = await Category.find();

		if (!categoryList) {
			throw new Error("The categorys not found.");
		}
		res.status(200).send({ success: true, data: categoryList });
	} catch (error) {
		next(error);
	}
};
module.exports.getCategoryById = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);

		if (!category) {
			throw new Error("The category with the given ID was not found.");
		} else {
			const productList = await Product.find({
				category: req.params.id,
			}).populate("category");

			if (!productList) {
				throw new Error("items not exist");
			} else {
				res.status(200).json({ success: true, Data: productList });
			}
		}
	} catch (error) {
		next(error);
	}
};

module.exports.getAllProducts = async (req, res, next) => {
	try {
		let filter = {};
		if (req.query.category) {
			filter = { category: req.query.category.split(",") };
		}

		const productList = await Product.find(filter).populate("category");

		if (!productList) {
			throw new Error("items not exist");
		}
		res.status(200).json({ success: true, Data: productList });
	} catch (error) {
		next(error);
	}
};


module.exports.getSomeProduct =  async (req, res) => {
	let { page, limit, sort, asc } = req.query;
	if (!page) page = 1;
	if (!limit) limit = 10;
  
	const skip = (page - 1) * 10;
	const Products = await Product.find()
	  .sort({ [sort]: asc })
	  .skip(skip)
	  .limit(limit);
	res.send({ page: page, limit: limit, Products: Products });
  };



module.exports.getProductById = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id).populate("category");

		if (!product) {
			throw new Error("Data Of Product not found");
		}
		res.status(200).json({ success: true, Data: product });
	} catch (error) {
		next(error);
	}
};

module.exports.logout = async (req, res, next) => {
	res.status(200).send({ auth: false, token: null });
};