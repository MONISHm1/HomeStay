const User = require("../models/user.js");


module.exports.signupUserForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.saveSignupUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        
        req.login(registeredUser, (error) => {
            if (error) return next(error);
            req.flash("success", "Welcome to Explore Hut!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};


module.exports.loginUserForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.saveLoginUser = async (req, res) => {
    req.flash("success", "Login successful!");
    res.redirect(res.locals.redirectUrl || "/listings");
};


module.exports.logoutUser = (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error);
        req.flash("success", "Logout successful.");
        res.redirect("/listings");
    });
};