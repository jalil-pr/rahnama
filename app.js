var express          =require("express"),
    mongoose         =require("mongoose"),
    home             =require("./models/home"),
    office           =require("./models/office"),
    shope            =require("./models/shope"),
    bodyParser       =require("body-parser"),
    fs               =require("fs"),
    multer           =require("multer");




var app=express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/rahnama",{useNewUrlParser:true});
// seedDb();


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

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

app.get("/",function(req,res)
{
	res.send("the swaping images here!")

});
//#########################home routes##########################
//########show route ###########
app.get("/home/:id",function(req,res)
{
	//find the home with the given id
	home.findById(req.params.id,function(err,foundItem)
	{
		if (err) {
			console.log(err)
		}
		else
		{
			
	        // send it to the show page
	        res.render("posts/show",{foundItem:foundItem});
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
//####### all homes##############
app.get("/homes",function(req,res)
{
	//find all the homes from the database
	home.find({},function(err,homes)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{

			//send it to the homes page
	        res.render("posts/home",{homes:homes});
		}
		
	})

	
});
// show all shops route
app.get("/rahnama/shope",function(req,res)
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
app.post("/rahnama/options",function(req,res)
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