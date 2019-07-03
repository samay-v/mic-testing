// dependencies
const express = require("express"),
    router = express.Router(),
    Venue = require("../models/venue");

//index route
router.get("/venues", (req, res)=>{
    Venue.find({}, (err, allVenues)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/index.ejs",{venue: allVenues});
        }
    })
})

//form to add a new venue
router.get("/venues/new", (req, res)=>{
    res.render("venue/new");
});

//Create new venue
router.post("/venues",(req, res)=>{
    Venue.create(req.body.venue, (err, newVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/venues/"+newVenue._id);
        }
    });
});

// show individual venue
router.get("/venues/:id",(req, res)=>{
    Venue.findById(req.params.id,(err, foundVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/show", {venue: foundVenue});
        }
    });
});

// form to edit a venue 
router.get("/venues/:id/edit", (req, res)=>{
    Venue.findById(req.params.id,(err, foundVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.render("venue/edit", {venue: foundVenue});
        }
    });
});

//Update route
router.put("/venues/:id", (req, res)=>{
    Venue.findByIdAndUpdate(req.params.id, req.body.venue, (err, updatedVenue)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/venues/" + updatedVenue._id);
        }
    });
});

//Destroy route
router.delete("/venues/:id",(req, res)=>{
    Venue.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }
    });
});

module.exports = router;