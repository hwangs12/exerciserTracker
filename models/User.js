const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
});

module.exports = User = mongoose.model("User", userSchema);
