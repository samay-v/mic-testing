const express = require("express"),
    router = express.Router(),
    Venue = require("../models/venue"),
    Review = require("../models/review")
    middleware = require("../middleware");

//post forms to mongoDb venues collection
router.post("/venues/:id/review",middleware.isLoggedIn, (req, res) => {
    Venue.findById(req.params.id).populate("reviews").exec((err, venue)=>{
        if (err) {
            console.log(err);
        } else {
            Review.create(req.body.review, (err, review) => {
                if (err) {
                    console.log(err);
                } else {
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    review.save();
                    venue.reviews.push(review);
                    let sumRating=0;
                    venue.reviews.forEach(review => {
                        sumRating += review.rating
                    });
                    venue.rating=Math.round(sumRating/venue.reviews.length);
                    venue.save((err, venue)=>{
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/venues/" + venue._id);
                        }
                        }
                    );
                }
            });
        }
    });
});

module.exports = router;