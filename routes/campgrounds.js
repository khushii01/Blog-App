var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

var middleware = require("../middleware");

//INDEX-show all campgrounds
router.get("/", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds }); 
		}
	});
});

//NEW- show form to create new campground
router.get("/new" , middleware.isLoggedIn , function(req, res){
	res.render("campgrounds/new");
});

//CREATE-add a new campground to the DATABASE
router.post("/", middleware.isLoggedIn , function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampGround = {name:name, image:image, desc:desc, author:author};
	
    // CREATE A NEW CAMPGROUND AND SAVE IT TO DATABASE
	Campground.create(newCampGround, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
	        //redirct to campgrounds page
	        res.redirect("/campgrounds");			
		}
	});
});


//SHOW- show info about a particular campground
router.get("/:id", function(req,res){
	//find campground with the given id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground:foundCampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
	//FIND AND UPDATE THE CAMPGROUND
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
	if(err){
		res.redirect("/campgrounds");
	}else{
		res.redirect("/campgrounds/" + req.params.id);
	}	
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;