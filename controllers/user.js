const User = require("../models/user.js");
const Listing = require("../models/listing.js"); 


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



module.exports.profile = async (req, res) => {

    const user = await User.findById(req.user._id);

    const listings = await Listing.find({
        owner: user._id,
    }).populate("reviews");

    const totalListings = listings.length;

    let totalReviews = 0;
    let totalRating = 0;

    listings.forEach((listing) => {

        totalReviews += listing.reviews.length;

        listing.reviews.forEach((review) => {
            totalRating += review.rating;
        });

    });

    const averageRating =
        totalReviews > 0
            ? (totalRating / totalReviews).toFixed(1)
            : 0;

    res.render("users/profile.ejs", {
        user,
        listings,
        totalListings,
        totalReviews,
        averageRating,
    });

};