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

//show individual venue
// router.get("/venues/:id",(req, res)=>{
//     Venue.findById(req.params.id,(err, foundVenue)=>{
//         if err
//     })
// })

module.exports = router;