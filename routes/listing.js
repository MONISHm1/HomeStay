const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// INDEX - show all listings
router.get("/", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
});

// NEW - form page
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// CREATE
router.post("/", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});

// SHOW
router.get("/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show", { listing });
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
});

// UPDATE
router.put("/:id", async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/listings/${req.params.id}`);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
});

module.exports = router;