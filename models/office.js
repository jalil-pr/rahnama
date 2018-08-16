var mongoose=require("mongoose");



var officeSchema=new mongoose.Schema({
	number_of_rooms:Number,
	fumber_of_floors:Number,
	floor_number:Number,
	location:String,
	category:String,
	price:Number,
})