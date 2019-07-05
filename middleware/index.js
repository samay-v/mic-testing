//all middleware
var Venue = require("../models/venue"),
    Review = require("../models/review");
var middlewareObj = {};

middlewareObj.checkVenueOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Venue.findById(req.params.id, function (err, foundVenue) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundVenue.author.id.equals(req.user._id)) {

                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkReviewsOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, function (err, foundReview) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = middlewareObj;