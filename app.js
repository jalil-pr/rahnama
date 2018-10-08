var express          =require("express"),
    mongoose         =require("mongoose"),
    home             =require("./models/home"),
    office           =require("./models/office"),
    shope            =require("./models/shope"),
    bodyParser       =require("body-parser"),
    User             =require("./models/user"),
    Cares            =require("./models/cares"),
    path             =require("path"),
    passport         =require("passport"),
    localStrategy    =require("passport-local"),
    multer           =require("multer");




var app=express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/rahnama",{useNewUrlParser:true});
//        PASSPORT STAFFFF
app.use(require('express-session')({
	secret:"Jalil Haidari is the best programmer in the world",
	resave:false,
	saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
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


//     INDEX ROUTES
app.get("/",function(req,res)
{
	// res.send("the swaping images here!")
	res.render("landing");

});
app.get("/all-properties",function(req,res)
{
	res.render("all");
});

//#########################HOME ROUTES##########################
app.get("/homes",function(req,res)
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
app.get("/homes/new",isLoggedIn,function(req,res)
{
	res.render("forms/home");
})

app.post("/homes/new",isLoggedin,(req,res)=>{
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

		    		});
		    		createHome.save();
		    	}
		    });
		res.redirect("/homes");
		}
	})
})

//####show route #######
app.get("/homes/:id",(req,res)=>
{
	//find the home with the given id
	home.findById(req.params.id,(err,foundHome)=>
	{
		if (err) {
			
			res.send("Oops the home could not be found ")
		}
		else
		{
			
	        // send it to the show page
	        res.render("posts/show",{foundHome:foundHome});
		}
	}) 

});

//#################   SHOPES  ###############
app.get("/shopes",(req,res)=>
{
	//find all the shopes from database
	shope.find({},function(err,allShopes)
	{
		if (err) {
			res.render("posts/noitems");
		}
		else
		{
			//send it to the show page
			res.render("posts/noitem");
	        // res.render("posts/shope",{allShopes:allShopes});
		}
	});
});
//          	SHOW ROUTE
app.get("/shopes/:id",function(req,res)
{
	//find the home with the given id
	shope.findById(req.params.id,function(err,foundShop)
	{
		if (err) {
			console.log(err)
		}
		else
		{
			
	        // send it to the show page
	        res.render("posts/show_shop",{foundShop:foundShop});
		}
	}) 

});
// OFFICE ROUTES#########
app.get("/offices",function(req,res)
{
	//find the offices
	office.find({},function(err,allOffices)
	{
            if (err) {
                res.render("posts/noitems");
            }
            else
            {
            	// render it to show page
            	// console.log(allOffices)
	            // res.render("posts/office",{allOffices:allOffices});
                 res.render("posts/noitem");
            }
			
	})

});
//   ####      CARE ROUTES
app.get("/cares",function(req,res)
{
	//find the offices
	Cares.find({},function(err,allCars)
	{
            if (err) {
                res.render("posts/noitem");
            }
            else
            {
            	// render it to show page
            	// console.log(allOffices)
	            // res.render("posts/office",{allOffices:allOffices});
                 res.render("posts/noitem");
            }
			
	})

});
//          BIKES ROUTES
app.get("/bikes",function(req,res)
{
	//find the offices
	Bikes.find({},function(err,allBikes)
	{
            if (err) {
                res.render("posts/noitem");
            }
            else
            {
            	// render it to show page
            	// console.log(allOffices)
	            // res.render("posts/office",{allOffices:allOffices});
                 res.render("posts/noitem");
            }
			
	})

});
app.get("/zamin",(req,res)=>{
	res.render("posts/noitem")
})

// sending the options to user
app.get("/options",isLoggedin,function(req,res)
{
	res.render("posts/options");
});

app.post("/options",isLoggedIn,function(req,res)
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
		 case 'office':
		 {
		 	way='forms/office';
		 	break;
		 }
		 case 'bike':
		 {
		 	way='forms/bike';
		 	break;
		 }
	}
	res.render(way);
	

});

app.get("/login",(req,res)=>
{
	res.render("auth/login");
});
app.post("/login",passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login"
}),(req,res)=>{	
});


app.get("/register",function(req,res)
{
  res.render("auth/register");
});
//   registration route#####
app.post("/register",function(req,res)
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
app.listen(3000,()=>
{
	console.log("server has started.");
});