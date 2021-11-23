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

// Specifying a virtual with a `ref` property is how you enable virtual
// population
userSchema.virtual('log', {
	ref: 'Exercise',
	localField: '_id',
	foreignField: 'description'
});

module.exports = User = mongoose.model("User", userSchema);
