const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	description: {
		type: String,
	},
	duration: {
		type: Number,
	},
	date: {
		type: Date,
	},
});

module.exports = Exercise = mongoose.model("Exercise", exerciseSchema);
