const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/sample.env" });

// Connect mongo atlas
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

//post and update database
app.post("/api/users", (req, res) => {
	res.json(req.body);
});

const listener = app.listen(process.env.PORT || 4000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
mongoose.connection.on("connected", () => {
	console.log("connected");
});
