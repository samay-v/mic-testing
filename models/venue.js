const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    image: String,
    description: String,
    contact: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: Number,
    days: [String]
});

module.exports = mongoose.model("Venue", venueSchema);