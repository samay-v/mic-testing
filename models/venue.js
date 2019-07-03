const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    name : String,
    address : String,
    city : String,
    image : String,
    description: String,
    contact : String,
    // author : {
    //     id: {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username : String,
    // },
    // reviews : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref: "Review"
    // },
    rating : String,
    days : [String]
});

module.exports = mongoose.model("Venue", venueSchema);