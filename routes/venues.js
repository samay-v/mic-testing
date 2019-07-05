// dependencies
const express = require("express"),
    router = express.Router(),
    Venue = require("../models/venue"),
    middleware = require("../middleware/index.js");

//index route
router.get("/venues", (req, res)=>{
    Venue.find({}, (err, allVenues)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/index.ejs",{venue: allVenues, currentUser: req.user});
        }
    })
})

//form to add a new venue
router.get("/venues/new",middleware.isLoggedIn, (req, res)=>{
    res.render("venue/new",{curUser:req.currentUser});
});

//Create new venue
router.post("/venues",middleware.isLoggedIn,(req, res)=>{
    Venue.create(req.body.venue, (err, newVenue)=>{
        if(err){
            console.log(err);
        }else{
            newVenue.author= { id: req.user._id, username: req.user.username };
            newVenue.save();
            res.redirect("/venues/"+newVenue._id);
        }
    });
});

// show individual venue
router.get("/venues/:id",(req, res)=>{
    Venue.findById(req.params.id).populate("reviews").exec((err, foundVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/show", {venue: foundVenue});
        }
    });
});

// form to edit a venue 
router.get("/venues/:id/edit",middleware.checkVenueOwnership, (req, res)=>{
    Venue.findById(req.params.id,(err, foundVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/edit", {venue: foundVenue});
        }
    });
});

//Update route
router.put("/venues/:id",middleware.checkVenueOwnership, (req, res)=>{
    Venue.findByIdAndUpdate(req.params.id, req.body.venue, (err, updatedVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/venues/" + updatedVenue._id);
        }
    });
});

//Destroy route
router.delete("/venues/:id",middleware.checkVenueOwnership, (req, res)=>{
    Venue.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/venues");
        }
    });
});

module.exports = router;