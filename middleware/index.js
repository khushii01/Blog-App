var Campground = require("../models/campground");
var Comment = require("../models/comment");

//ALL THE MIDDLEWARES GO HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    //IS USER LOGGED IN
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect('back');
            } else {
                //DOES THE USER OWN CAMPGROUND
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error", "PERMISSION DENIED");
                    res.redirect('back');
                }
            }
        });
    } else {
		req.flash("error", "YOU NEED TO BE LOGGED IN!");
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    //IS USER LOGGED IN
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
				req.flash("error", "CAMPGROUND NOT FOUND");
                res.redirect('back');
            } else {
                //DOES THE USER OWN COMMENT
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error", "PERMISSION DENIED");
                    res.redirect('back');
                }
            }
        });
    } else {
		req.flash("error", "YOU NEED TO BE LOGGED IN!");
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
	    req.flash("error", "YOU NEED TO BE LOGGED IN!");
        res.redirect("/login");

}

module.exports = middlewareObj;