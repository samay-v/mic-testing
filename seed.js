const mongoose = require("mongoose"),
    Venue = require("./models/venue.js");

function seed(){
    Venue.create({
        name : "venue name",
        address : "xyz",
        image : "some url",
        description: "lorem ipsum",
        contact : "97451256",
        rating : "5",
        days : ["mon", "tues", "thurs"]
    }, (err, venue)=>{
        if(err){
            console.log(err)
        } else {
            console.log("added a campground");
        }
    })
};
module.exports = seed;