
var express = require("express");
var passport = require("passport");
var home = require("../models/home");
var router = express.Router({ mergeParams: true });
var Comment = require("../models/comment");
let upload = require("../config/dbconfig");
let isLoggedIn = require("../config/islogedin");

//#########################HOME ROUTES##########################
router.get("/", function (req, res) {
	home.find({}, function (err, homes) {
		if (err) {
			res.render("noitems");
		}
		else {
			res.render("homes/index", { homes: homes });
		}

	})
});
router.get("/new", isLoggedIn, function (req, res) {
	res.render("forms/home");
})

router.post("/new", isLoggedIn, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
		}
		else {
			var nOfRoom = req.body.num_of_rooms;
			var nOfFloors = req.body.num_of_floors;
			var category = req.body.category;
			var floorNo = req.body.floor_number;
			var provence = req.body.provence;
			var loc = req.body.location;
			var price = req.body.price;
			var ph_num = req.body.ph_num;

			var newHome = new home({
				number_of_rooms: nOfRoom,
				number_of_floors: nOfFloors,
				floor_number: floorNo,
				ph_num: ph_num,
				provence: provence,
				location: loc,
				category: category,
				price: price
			});
			home.create(newHome, (err, createHome) => {
				if (err) {
					console.log(err);

				} else {
					req.files.forEach((file) => {
						createHome.images.push(file.filename);
					})
				};
				createHome.save();
			}


			);
			res.redirect("/homes");
		}
	})
})

//####show route #######
router.get("/:id", (req, res) => {
	//find the home with the given id
	home.findById(req.params.id, (err, foundHome) => {
		if (err) {

			res.send("Oops the home could not be found ")
			console.log(err);
		}
		else {
			// send it to the show page
			res.render("homes/show", { foundHome: foundHome });
		}
	})
});

module.exports = router;