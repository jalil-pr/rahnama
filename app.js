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
let storage=multer.diskStorage({
	destination:'./public/uploads',
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
	}
});

app.use(function(req,res,next)
	{
		res.locals.currentUser=req.user;
		next();

	});

//   MULTER FOR STORING THE IMAGES
let upload=multer(
{
	storage:storage
}).array('images');

app.use("/",indexRoutes);
app.use("/homes/",homeRoutes);
app.use("/shopes/",shopesRoutes);



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