let mongoose = require("mongoose");


let mongooseSchema = new mongoose.Schema({
	email: String,
	message: String
})

module.exports = mongoose.model("Contact", mongooseSchema);

