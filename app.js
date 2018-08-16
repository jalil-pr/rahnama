var express          =require("express"),
    mongoose         =require("mongoose"),
    home             =require("./models/home"),
    bodyParser       =require("body-parser"),
    seedDb           =require("./seedDb");




var app=express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/rahnama",{useNewUrlParser:true});


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res)
{
	home.find({},function(err,homes)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("posts/index",{homes:homes});
		}
		
	})
});

app.get("/rahnama",function(req,res)
{
	res.send("the swaping images here!")

});
//#########################home routes##########################
//########show route ###########
app.get("/rahnama/home/:id",function(req,res)
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
//####### all homes##############
app.get("/rahnama/homes",function(req,res)
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

app.get("/rahnama/shope",function(req,res)
{
	res.render("posts/shope");

});
app.get("/rahnama/office",function(req,res)
{
	res.render("posts/office");

});
// sending the options to user
app.get("/rahnama/options",function(req,res)
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

app.get("/rahnama/login",function(req,res)
{
	res.render("auth/login");
});

app.get("/rahnama/register",function(req,res)
	{
		res.render("auth/register");
	});












app.listen(3000,function()
{
	console.log("server has started.");
});