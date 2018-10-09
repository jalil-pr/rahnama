
var express=require("express");
var passport=require("passport");
var home=require("../models/home");
var router=express.Router({mergeParams:true});
var Comment=require("../models/comment");
let multer=require("multer");
let path=require("path");


let storage=multer.diskStorage({
	destination:'./public/uploads',
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
	}
});


//   MULTER FOR STORING THE IMAGES
let upload=multer(
{
	storage:storage
}).array('images');
//#########################HOME ROUTES##########################
router.get("/",function(req,res)
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
router.get("/new",isLoggedIn,function(req,res)
{
	res.render("forms/home");
})

router.post("/new",isLoggedIn,(req,res)=>{
	upload(req,res,(err)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			var nOfRoom=req.body.num_of_rooms;
			var nOfFloors=req.body.num_of_floors;
			var category=req.body.category;
			var floorNo=req.body.floor_number;
			var provence=req.body.provence;
			var loc=req.body.location;
			var price=req.body.price;

		    var newHome=new home({
		    	number_of_rooms:nOfRoom,
				number_of_floors:nOfFloors,
				floor_number:floorNo,
				provence:provence,
				location:loc,
				category:category,
				price:price
		    });
		    home.create(newHome,(err,createHome)=>{
		    	if(err)
		    	{
		    		console.log(err);

		    	}else{
		    		req.files.forEach((file)=>{
		    					 createHome.images.push(file.filename);    				       
		    				})
		    		};
		    		Comment.create({
		    			text:"awesome",
		    			author:"jalil haidari"
		    		},(err,createComment)=>{
		    			if(err)
		    			{
		    				console.log(err);
		    			}
		    			else
		    			{
		    				createHome.comments.push(createComment);
		    			    createComment.save();
		    			}
		    			
		    		})
		    		createHome.save();
		    	
		    		
		    	}
		     

		    );
		res.redirect("/homes");
		}
	})
})

//####show route #######
router.get("/:id",(req,res)=>
{
	//find the home with the given id
	home.findById(req.params.id,(err,foundHome)=>
	{
		if (err) {
			
			res.send("Oops the home could not be found ")
		    console.log(err);
		}
		else
		{	
	        // send it to the show page
	        res.render("posts/show",{foundHome:foundHome});
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