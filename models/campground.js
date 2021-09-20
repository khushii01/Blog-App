var mongoose = require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectID,
		    ref: "user"	
		},
		username: String
	},
	comments: [
		{
		type: mongoose.Schema.Types.ObjectID,
		ref: "Comment"
		}
	]
});

//MODEL
module.exports = mongoose.model("Campground", campgroundSchema);
