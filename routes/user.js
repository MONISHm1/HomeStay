const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware.js");
const userController = require("../controllers/user.js");
const { isLoggedIn } = require("../utils/middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({
    storage,
});

router.route("/signup")
    .get(userController.signupUserForm)
    .post(wrapAsync(userController.saveSignupUser));


router.route("/login")
    .get(userController.loginUserForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true ,failureMessage: false }),
        userController.saveLoginUser,
    );


router.get(
    "/profile",
    isLoggedIn,
    wrapAsync(userController.profile)
);

router.get(
    "/profile/edit",
    isLoggedIn,
    userController.editProfile
);

router.put(
    "/profile",
    isLoggedIn,
    upload.single("avatar"),
    wrapAsync(userController.updateProfile)
);

router.get("/logout", userController.logoutUser);

module.exports = router;