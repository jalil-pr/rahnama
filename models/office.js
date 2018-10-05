var mongoose=require("mongoose");



var officeSchema=new mongoose.Schema({
	length:String,
	width:String,
	location:String,
	category:String,
	price:Number,
	description:String,
	image:String,
	floor_number:String

})

module.exports=mongoose.model("Office",officeSchema)