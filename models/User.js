const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},
		_id: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ _id: false }
);

module.exports = User = mongoose.model("User", userSchema);
