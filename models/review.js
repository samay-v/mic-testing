var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    text: String,
    rating: Number,
    created: {type:Date, default: Date.now}
});

module.exports = mongoose.model("Review", reviewSchema);