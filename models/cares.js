let mongoose=require("mongoose");
let caresSchema=new mongoose.Schema({
	model:String,
	type:String,
	hand:String,
	stringHand:String,
	images:[]
})
module.exports=mongoose.model("Cares",caresSchema);