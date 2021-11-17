const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	count: {
		type: Number,
	},
	log: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exercise",
		},
	],
});

module.exports = Log = mongoose.model("Log", logSchema);
