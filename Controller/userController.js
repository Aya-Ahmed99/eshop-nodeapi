const mongoose = require("mongoose");
require("./../Models/userModel");
const UserSchema = mongoose.model("User");

module.exports.getAllUsers = (request, response, next) => {
	UserSchema.find({})
		.select("fullname email phone")
		.then((data) => {
			response.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};
module.exports.getUserById = (request, response, next) => {
	UserSchema.findOne({ _id: request.params.id })
		.select("-password")
		.then((data) => {
			if (data == null) throw new Error("user doesn't exist");
			else {
				if (request.params.id == data.id) {
					response.status(200).json({ data });
				} else {
					throw new Error("Not Authorized");
				}
			}
		})
		.catch((error) => {
			next(error);
		});
};

module.exports.updateUser = (request, response, next) => {
	if (request.id == request.body.id) {
		UserSchema.updateOne(
			{ _id: request.body.id },
			{
				$set: {
					fullname: request.body.fullname,
					password: request.body.password,
					email: request.body.email,
					phone: request.body.phone,
					isAdmin: request.body.isAdmin,
				},
			}
		)
			.then((data) => {
				response.status(200).json({ data });
			})
			.catch((error) => {
				next(error);
			});
	} else {
		let error = new Error("Not Authorized");
		error.status = 403;
		next(error);
	}
};
module.exports.deleteUser = (request, response, next) => {
	UserSchema.deleteOne({ _id: request.body.id })
		.then((data) => {
			response.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};
