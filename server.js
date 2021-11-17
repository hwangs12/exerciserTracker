const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Exercise = require("./models/exercise");
const Log = require("./models/log");
const User = require("./models/user");
require("dotenv").config({ path: __dirname + "/sample.env" });

// Connect mongo atlas
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log(err);
		}
	}
);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

//post and update database
app.post("/api/users", async (req, res) => {
	const _id = mongoose.Types.ObjectId();
	const { username } = req.body;
	let user = new User({
		_id,
		username,
	});
	await user.save((err) => {
		if (err) return console.log(err);

		const log = new Log({
			userId: user._id,
			count: 0,
		});

		log.save((err) => {
			if (err) return console.log(err);
		});
	});
	res.json({
		_id: _id,
		username,
	});
});

app.post("/api/users/:_id/exercises", async (req, res) => {
	const { _id, description, duration, date } = req.body;
	const id = ObjectId(_id);
	const user = await User.findOne({ _id: id });
	if (user) {
		if (description.length < 1) {
			res.send("Path `description` is required");
			return;
		}
		if (duration.length < 1) {
			res.send("Path `duration` is required");
			return;
		}

		const exercise = new Exercise({
			userId: id,
			description,
			duration,
			date,
		});

		await Log.updateOne({ userId: id }, { $push: { log: [exercise] } });

		await exercise.save();

		res.json(exercise);
	} else {
		res.send("Unknown userId");
	}
	//i need to find username of this id
});

app.get("/api/users/:_id/logs", async (req, res) => {
	mongoose.find({});
});

const listener = app.listen(process.env.PORT || 4000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
mongoose.connection.on("connected", () => {
	console.log("connected");
});
