var mongoose=require("mongoose");

var shopeSchema=new mongoose.Schema({
	length:String,
	width:String,
	owner:String,
	category:String,
	price:Number,
	location:String,
	image:String,
	provence:String,
	floor_number:String
})

module.exports=mongoose.model("Shope",shopeSchema);