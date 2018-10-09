var mongoose=require("mongoose");

var shopeSchema=new mongoose.Schema({
	length:String,
	width:String,
	category:String,
	price:Number,
	location:String,
	provence:String,
	floor_number:String,
	images:[]
})

module.exports=mongoose.model("Shope",shopeSchema);