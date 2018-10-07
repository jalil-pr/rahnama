var express          =require("express"),
    mongoose         =require("mongoose"),
    home             =require("./models/home"),
    office           =require("./models/office"),
    shope            =require("./models/shope"),
    bodyParser       =require("body-parser"),
    path             =require("path"),
    multer           =require("multer");




var app=express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/rahnama",{useNewUrlParser:true});
// seedDb();


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
let storage=multer.diskStorage({
	destination:'./public/uploads',
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
	}
});
let upload=multer(
{
	storage:storage
}).array('images');



app.get("/",function(req,res)
{
	// res.send("the swaping images here!")
	res.render("landing");

});
app.get("/rahnama",function(req,res)
{
	res.render("all");
})
//#########################home routes##########################
app.get("/homes",function(req,res)
{
	home.find({},function(err,homes)
	{
		if(err)
		{
			res.send("currently no home found! please come back latter");
		}
		else
		{
			res.render("posts/index",{homes:homes});
		}
		
	})
});
app.get("/homes/new",function(req,res)
{
	res.render("forms/home");
})

app.post("/homes/new",(req,res)=>{
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
			console.log(err)
			res.send("Oops the home could not be found ")
		}
		else
		{
			
	        // send it to the show page
	        res.render("posts/show",{foundHome:foundHome});
		}
	}) 

});

app.get("/shope/:id",function(req,res)
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
// show all shops route
app.get("/shopes",function(req,res)
{
	//find all the shopes from database
	shope.find({},function(err,allShopes)
	{
		if (err) {
			console.log(err);
		}
		else
		{
			//send it to the show page
	        res.render("posts/shope",{allShopes:allShopes});
		}

	});

	
});
app.get("/office",function(req,res)
{
	//find the offices
	office.find({},function(err,allOffices)
	{
            if (err) {
            	console.log(err)
            }
            else
            {
            	// render it to show page
            	console.log(allOffices)
	            res.render("posts/office",{allOffices:allOffices});

            }
			
	})

});
// sending the options to user
app.get("/options",function(req,res)
{
	res.render("posts/options");
});
app.post("/options",function(req,res)
{
	var propertyType=req.body.propertyType;
	if(propertyType.trim()==='home')
	{
		res.render("forms/home.ejs");
	}
	else 
	{
		console.log("Oops home has not been selected.")
	}

});


app.get("/login",function(req,res)
{
	res.render("auth/login");
});

app.get("/register",function(req,res)
	{
		res.render("auth/register");
	});




app.listen(3000,function()
{
	console.log("server has started.");
});