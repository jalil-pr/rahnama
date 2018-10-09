var mongoose=require("mongoose");



var homeSchema=new mongoose.Schema({
	number_of_rooms:Number,
	number_of_floors:Number,
	floor_number:String,
	provence:String,
	location:String,
	category:String,
	price:Number,
	images:[],
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comments"
	}]
	
});
module.exports=mongoose.model("Home",homeSchema);