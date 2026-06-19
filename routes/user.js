const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// SIGNUP FORM
router.get("/signup", (req, res) => {
    res.render("users/signup");
});

// SIGNUP LOGIC
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username });
    await User.register(newUser, password);

    res.redirect("/login");
});

// LOGIN FORM
router.get("/login", (req, res) => {
    res.render("users/login");
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/listings",
    failureRedirect: "/login"
}));

// LOGOUT
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/listings");
    });
});

module.exports = router;