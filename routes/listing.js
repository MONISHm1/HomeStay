const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../utils/middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer"); 
const { storage } = require("../cloudConfig.js");
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images allowed"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 }
}); 


router.get("/new", isLoggedIn, listingController.newListingForm);


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListingForm));

router
    .route("/")
    .get(wrapAsync(listingController.index)) 
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.saveNewListing),
    );

router
    .route("/:id")
    .get(wrapAsync(listingController.showListingDetails)) 
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing),
    ) 
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); 



    
router.post("/:id/reserve", isLoggedIn, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    req.flash("success", `🎉 Booking confirmed for "${listing.title}"! The host will contact you shortly.`);
    res.redirect(`/listings/${req.params.id}`);
}));

module.exports = router;
module.exports = router;