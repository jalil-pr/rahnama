var express          =require("express"),
    mongoose         =require("mongoose");




var app=express();
mongoose.connect("mongodb://localhost:27017/rahnama",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res)
{
	res.render("posts/index");
});

app.get("/rahnama",function(req,res)
{
	res.send("the swaping images here!")

});

app.get("/rahnama/khana",function(req,res)
{
	res.send("welcome to khana ")

});
app.get("/rahnama/dokan",function(req,res)
{
	res.send("welcome to dokan")

});
app.get("/rahnama/daftar",function(req,res)
{
	res.send("welcome to dafter ")

});
app.get("/rahnama/login",function(req,res)
{
	res.send("welcome to login")
});

app.get("/rahnama/register",function(req,res)
	{
		res.send("welcome to register")
	});











app.listen(3000,function()
{
	console.log("server has started.");
});