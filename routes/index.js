var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING-ROOT ROUTE
router.get("/", function(req, res){
	res.render("landing");
});



//=================
//AUTH ROUTES
//=================
//TO GET THE FORM- SIGN UP
router.get("/register", function(req, res){
	res.render("register");
});

//POST ROUTE FOR SIGN UP
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message );
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "WELCOME TO YELPCAMP" + (user.username).toUpperCase());
			res.redirect("/campgrounds");
			
		});
	});
})

//LOGIN FORM
router.get("/login", function(req, res){
	res.render("login");
});

//POST ROUTE FOR LOGIN
router.post("/login", passport.authenticate("local" , 
	{ successRedirect: "/campgrounds",
	  failureRedirect: "/login"
	}), function(req, res){	
});

//LOG OUT
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "LOGGED OUT! ");
	res.redirect("/campgrounds");
});


module.exports = router;
