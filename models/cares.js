let mongoose=require("mongoose");
let caresSchema=new mongoose.Schema({
	model:String,
	type:String,
	hand:String,
	plate:String,
	ph_num:Number,
    price:Number,
	steering_hand:String,
	info:String,
	images:[]
})
module.exports=mongoose.model("Cars",caresSchema);