
var express = require("express");
var passport = require("passport");
var home = require("../models/home");
var User = require("../models/user");
var router = express.Router({ mergeParams: true });
let isLoggedIn = require("../config/islogedin");
let Contact = require("../models/contact");



//     INDEX ROUTES
router.get("/", function (req, res) {
	// res.send("the swaping images here!")
	res.render("landing");

});
router.get("/all-properties", function (req, res) {
	home.find({}, function (err, homes) {
		if (err) {
			res.render("noitems");
		}
		else {
			res.render("homes/index", { homes: homes });
		}

	})
});
router.post("/contact", (req, res) => {
	Contact.create(req.body.contact, (err, createdMessage) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	})
});


// OPTIONS ROUTES
router.get("/options", isLoggedIn, function (req, res) {
	res.render("auth/options");
});

router.post("/options", isLoggedIn, function (req, res) {
	var propertyType = req.body.propertyType;
	let way = "/";
	switch (propertyType) {
		case 'home':
			{
				way = 'forms/home.ejs';
				break;

			}
		case 'shope':
			{
				way = 'forms/shope.ejs';
				break;
			}
		case 'car':
			{
				way = 'forms/car';
				break;
			}

	}
	res.render(way);
});

// AUTHENTICATION ROUTES
router.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	}
	else {
		res.render("auth/login");

	}
});
router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), (req, res) => {
});


router.get("/register", function (req, res) {
	res.render("auth/register");
});
//   registration route#####
router.post("/register", function (req, res) {

	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {

			console.log(err);
			return res.render("auth/register");
		}
		else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/");
			});

		}

	});

});
router.get("/privacy", (req, res) => {
	res.render("privacy");
})
router.get("/contactus", (req, res) => {
	res.render("contactus");
})
router.get("/about", (req, res) => {
	res.render("about");
})
module.exports = router;
