/* Require dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

/* Activate dependencies */
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Variables */
const items = ["Buy Groceries", "Laundry", "Relax"];
const workItems = [];

/* GET Requests */
app.get("/", function (req, res) {
	res.render("list", {
		kindOfDay: date.getDate(),
		listTitle: date.getDay(),
		newListItems: items,
	});
});

app.get("/work", function (req, res) {
	res.render("list", {
		kindOfDay: date.getDate(),
		listTitle: "Work List",
		newListItems: items,
	});
});

/* POST Requests */
app.post("/", function (req, res) {
	const item = req.body.newItem;

	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}

	items.push(item);

	res.redirect("/");
});

/* Port check */
app.listen(3000, function () {
	console.log("Server started on port 3000");
});
