let express = require("express");
let router = express.Router({ mergeParams: true });
let upload = require("../config/dbconfig");
let Cars = require("../models/cares");
let isLoggedIn = require("../config/islogedin");

router.get("/", (req, res) => {

	//find all the shopes from database
	Cars.find({}, (err, allCars) => {
		if (err) {
			res.render("noitems");
		}
		else {

			res.render("cars/cars", { allCars: allCars });
		}
	});
});

router.get("/new", isLoggedIn, function (req, res) {
	res.render("forms/car");
})
// new car

router.post("/new", isLoggedIn, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
			res.render("noitems");
		}
		else {
			Cars.create(req.body.car, (err, createCar) => {
				if (err) {
					console.log(err);
					res.render("noitems");
				}
				else {
					req.files.forEach((file) => {
						createCar.images.push(file.filename)

					})
					createCar.save();
				}
			})
			res.redirect("/cars");

		}
	})
})

//####show route #######
router.get("/:id", (req, res) => {
	//find the home with the given id
	Cars.findById(req.params.id, (err, foundCars) => {
		if (err) {

			console.log(err);
			res.render("noitems");
		}
		else {
			// send it to the show page
			res.render("cars/show", { foundCars: foundCars });
		}
	})
});

module.exports = router;
