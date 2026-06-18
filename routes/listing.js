const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");



router.get("/", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
});

router.post("/", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});