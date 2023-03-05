const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	fullname: { type: String, required: true },
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,5})+$/,
			"not a valid mail",
		],
		unique: true,
		required: true,
	},
	phone: { type: String, required: true },
	isAdmin: { type: Boolean, required: true },
});

mongoose.model("User", UserSchema);
