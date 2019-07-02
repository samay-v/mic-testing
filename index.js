//require dependencies
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Venue = require("./models/venue"),
    seed = require("./seed"),
    indexRoutes = require("./routes/index.js");

//configure express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//configure mongoose
mongoose.connect("mongodb://localhost:27017/mic_testing", {useNewUrlParser: true});
// seed();

//routes
app.use(indexRoutes);

//start server
const port = 3000;
app.listen(port, () => {
    console.log("server is working for MicTesting on port "+port);
});