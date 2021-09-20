var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data =[
	{name:"Anything", 
	image:"https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg",
	desc:"blah blah"},
	
	{name:"Anything", 
	image:"https://images.unsplash.com/photo-1592960753504-e40dc9c13399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	desc:"blah blah blah"},
	
	{name:"Anything", 
	image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	desc:"blah blah blah blah"}
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('removed campgrounds');
        //ADD CAMPGROUNDS
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campgrounds) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('added a campground');
					//create comment
					Comment.create(
						{
							text:"Blah blah", 
							author:"homer"
						},function(err, comment){
							if(err){
								console.log(err);
							}else{
								campgrounds.comments.push(comment);
								campgrounds.save();
								console.log("Created new comment");
							}
						});
                }
            });
        });
    });
}


module.exports = seedDB;