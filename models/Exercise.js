const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	userId: {
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
		type: String,
	},
});

module.exports = Exercise = mongoose.model("Exercise", exerciseSchema);
