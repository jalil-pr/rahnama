let mongoose = require('mongoose');
let localMongoose = require('passport-local-mongoose');


let userSchema = new mongoose.Schema({
	username: String,
	password: String
});
userSchema.plugin(localMongoose);

module.exports = mongoose.model("User", userSchema);