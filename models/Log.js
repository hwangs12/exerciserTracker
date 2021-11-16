const mongoose = require("mongoose");
const Exercise = require("./Exercise");
const User = require("./User");

const logSchema = new mongoose.Schema({
	username: {
		type: User,
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
