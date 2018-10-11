let express=require("express");
let router=express.Router({mergeParams:true});
let upload=require("../config/dbconfig");
let Cars=require("../models/cares");

router.get("/",(req,res)=>
{

	//find all the shopes from database
	Cars.find({},(err,allCars)=>
	{
		if (err) {
			res.render("posts/noitems");
		}
		else
		{	
			console.log("you hitted the cars route bro you have to pay for it");
	        res.render("posts/cars",{allCars:allCars});
		}
	});
});

router.get("/new",isLoggedIn,function(req,res)
{
	res.render("forms/car");
})
// new car

router.post("/new",isLoggedIn,(req,res)=>
{
	upload(req,res,(err)=>{
		if(err)
		{
			console.log(err);
			res.render("posts/noitems");
		}
		else
		{
			Cars.create(req.body.car,(err,createCar)=>{
				if (err) {
					console.log(err);
					res.render("posts/noitems");
				}
				else
				{
					req.files.forEach((file)=>{
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
router.get("/:id",(req,res)=>
{
	//find the home with the given id
	Cars.findById(req.params.id,(err,foundCars)=>
	{
		if (err) {
			
			res.send("Oops the home could not be found ")
		    console.log(err);
		}
		else
		{	
	        // send it to the show page
	        res.render("cars/show",{foundCars:foundCars});
		}
	}) 
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
