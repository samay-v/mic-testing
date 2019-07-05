//require dependencies
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    Venue = require("./models/venue"),
    Review = require("./models/review"),
    seed = require("./seed"),
    indexRoutes = require("./routes/index.js"),
    reviewRoutes = require("./routes/reviews.js"),
    venueRoutes = require("./routes/venues");

//configure express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//configure mongoose
mongoose.connect("mongodb://localhost:27017/mic_testing", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
// seed();

//routes
app.use(indexRoutes);
app.use(venueRoutes);
app.use(reviewRoutes);

//start server
const port = 3000;
app.listen(port, () => {
    console.log("server is working for MicTesting on port " + port);
});