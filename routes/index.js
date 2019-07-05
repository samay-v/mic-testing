const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", (req, res)=>{
    res.render("index");
});

//auth routes:
//show registration form
router.get("/register", (req, res) => {
    res.render("register");
})

//add registration\
router.post("/register",(req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/venues");
        });
    });
});

//Login show
router.get("/login", (req, res) => {
    res.render("login");
});

//Login post
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/venues",
        failureRedirect: "/login"
    }), (req, res) => {
    });

//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


module.exports = router;