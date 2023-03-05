const mongoose = require("mongoose");
require("./../Models/orderItemModel");
require("./../Models/orderModel");
const { Product } = require("./../Models/productModel");
const OrderItem = mongoose.model("OrderItem");
const Order = mongoose.model("Order");
const UserSchema = mongoose.model("User");

module.exports.addOrder = async (req, res, next) => {
	try {
		let total = 0;
		const orderItemIds = Promise.all(
			req.body.orderItems.map(async (orderitem) => {
				let newOrderItem;
				let foundProduct = await Product.findOne({
					$and: [
						{ _id: orderitem.product },
						{ countInStock: { $gte: orderitem.quantity } },
					],
				});
				if (foundProduct == null) {
					throw new Error("the Product Not Found or not enough quantity");
				} else {
					newOrderItem = new OrderItem({
						quantity: orderitem.quantity,
						product: orderitem.product,
					});
					newOrderItem = await newOrderItem.save();

					let product_price = await Product.findOne(
						{ _id: orderitem.product },
						{ price: 1, _id: 0 }
					);
					total += product_price.price * orderitem.quantity;

					let qun = await Product.findOne(
						{ _id: orderitem.product },
						{ countInStock: 1, _id: 0 }
					);
					const updateQuntaty = await Product.findByIdAndUpdate(
						orderitem.product,
						{
							countInStock: qun.countInStock - orderitem.quantity,
						},
						{ new: true }
					);
				}

				return newOrderItem._id;
			})
		);

		const orderItemIdsResolved = await orderItemIds;
		let order = new Order({
			orderItems: orderItemIdsResolved,
			shippingAddress1: req.body.shippingAddress1,
			shippingAddress2: req.body.shippingAddress2,
			city: req.body.city,
			zip: req.body.zip,
			country: req.body.country,
			phone: req.body.phone,
			status: req.body.status,
			totalPrice: total,
			user: req.id,
		});

		order = await order.save();
		if (!order) throw new Error("the order cannot be created!");
		res.status(201).send({ success: true, data: order });
	} catch (error) {
		next(error);
	}
};

module.exports.getAllOrders = async (req, res, next) => {
	const orderList = await Order.find()
		.populate("user", "fullname")
		.sort({ dateOrdered: -1 });

	try {
		if (!orderList) {
			throw new Error("Not Data To Show");
		} else res.status(200).json({ success: true, data: orderList });
	} catch (error) {
		next(error);
	}
};

module.exports.getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("user", "fullname")
			.populate({
				path: "orderItems",
				populate: { path: "product", populate: "category" },
			});
		if (!order) {
			throw new Error("Not Data To Show");
		} else {
			if (order.user._id == req.id || req.role == "admin")
				res.status(200).json({ success: true, data: order });
			else throw new Error("Not Authorized");
		}
	} catch (error) {
		next(error);
	}
};

module.exports.deleteById = (req, res, next) => {
	Order.findByIdAndRemove(req.params.id)
		.then(async (order) => {
			if (order) {
				await order.orderItems.map(async (orderItem) => {
					let oldOrder = await OrderItem.findOne(orderItem);

					let qun = await Product.findOne(
						{ _id: oldOrder.product },
						{ countInStock: 1, _id: 0 }
					);

					await Product.findByIdAndUpdate(
						oldOrder.product,
						{
							countInStock: qun.countInStock + oldOrder.quantity,
						},
						{ new: true }
					);
					await OrderItem.findByIdAndRemove(orderItem);
				});
				res
					.status(200)
					.json({ success: true, message: "the order is deleted!" });
			} else {
				res.status(404).json({ success: false, message: "order not found!" });
			}
		})
		.catch((err) => {
			next(err);
		});
};

module.exports.updateOrderById = async (req, res) => {
	const order = await Order.findByIdAndUpdate(
		req.params.id,
		{
			status: req.body.status,
		},
		{ new: true }
	);

	if (!order) res.status(400).send("the order cannot be update!");

	res.send(order);
};

module.exports.totalSales = async (req, res) => {
	const totalSales = await Order.aggregate([
		{ $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
	]);

	if (!totalSales) {
		return res.status(400).send("The order sales cannot be generated");
	}

	res.send({ totalsales: totalSales.pop().totalsales });
};
