
var express=require("express");
var passport=require("passport");
var home=require("../models/home");
var User       =require("../models/user");
var router=express.Router({mergeParams:true});



//     INDEX ROUTES
router.get("/",function(req,res)
{
	// res.send("the swaping images here!")
	res.render("landing");

});
router.get("/all-properties",function(req,res)
{
	home.find({},function(err,homes)
	{
		if(err)
		{
			res.send("currently no homes found! please come back latter");
		}
		else
		{
			res.render("posts/index",{homes:homes});
		}
		
	})
});

// OPTIONS ROUTES
router.get("/options",isLoggedIn,function(req,res)
{
	res.render("posts/options");
});

router.post("/options",isLoggedIn,function(req,res)
{
	var propertyType=req.body.propertyType;
	let way="/";
	switch(propertyType)
	{
		case 'home':
		 {
		 	way='forms/home.ejs';
		 	break;

		 }
		 case 'shope':
		 {
		 	way='forms/shope.ejs';
		 	break;
		 }
		 case 'car':
		 {
		 	way='forms/car';
		 	break;
		 }
		
	}
	res.render(way);
});

// AUTHENTICATION ROUTES
router.get("/login",(req,res)=>
{
	if(req.isAuthenticated()){
		res.redirect("/");
	}
	else{
	res.render("auth/login");
		
	}
});
router.post("/login",passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login"
}),(req,res)=>{	
});


router.get("/register",function(req,res)
{
  res.render("auth/register");
});
//   registration route#####
router.post("/register",function(req,res)
{
	
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user)
	{
		if(err)
		{

			console.log(err);
			return res.render("auth/register");
		}
		else
		{
			passport.authenticate("local")(req,res,function()
			{
				res.redirect("/");

			});

		}

	});

});

// MIDDLEWARES
function isLoggedIn(req,res,next)
{
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}
module.exports=router;
