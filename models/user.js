var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});
//STARTS TO ADD IN METHODS TO USERS
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);