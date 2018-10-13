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



let upload=require("./config/dbconfig");
let isLoggedIn=require("./config/islogedin");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
//mongodb://jalil:Abdulmatin.1995@ds121311.mlab.com:21311/rahnama
mongoose.connect("mongodb://jalil:Abdulmatin.1995@ds121311.mlab.com:21311/rahnama",{useNewUrlParser:true});
//        PASSPORT STAFFFF
app.use(require('express-session')({
	secret:"Jalil Haidari is the best programmer in the world",
	resave:false,
	saveUninitialized:false
}));

let indexRoutes=require("./routes/index");
let homeRoutes=require("./routes/homes");
let shopesRoutes=require("./routes/shopes");
let carsRoutes=require("./routes/cars");



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.use(function(req,res,next)
	{
		res.locals.currentUser=req.user;
		next();

	});

app.use("/",indexRoutes);
app.use("/homes/",homeRoutes);
app.use("/shopes/",shopesRoutes);
app.use("/cars/",carsRoutes);

app.listen(3000,()=>
{
	console.log("server has started.");
});