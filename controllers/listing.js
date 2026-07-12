const Listing = require("../models/listing.js");
const { geocodeLocation } = require("../utils/geocode");


module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    let filter = {};

    // Category Filter
    if (category) {
        filter.category = category;
    }

    // Search Filter
    if (search && search.trim() !== "") {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
        ];
    }

    const allListings = await Listing.find(filter);

    res.render("../views/listings/index.ejs", {
        listings: allListings,
        activeCategory: category || null,
        search: search || "",
    });
};

module.exports.newListingForm = (req, res) => {
  res.render("../views/listings/new.ejs");
};

module.exports.showListingDetails = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  // Handling case if listing does not found.
  if (!listing) {
    req.flash("error", "Requested list does not exist!");
    return res.redirect("/listings");
  }
  res.render("../views/listings/show.ejs", { listing });
};


module.exports.saveNewListing = async (req, res, next) => {
  console.log("FILE:", req.file);
  try {
    const newListing = new Listing(req.body.listing);

    // const coords = await geocodeLocation(
    //     newListing.location,
    //     newListing.country
    // );

    let coords;
    try {
      coords = await geocodeLocation(newListing.location, newListing.country);
    } catch {
      coords = { latitude: 20.5937, longitude: 78.9629 };
    }

    newListing.latitude = coords.latitude;
    newListing.longitude = coords.longitude;

  
    if (req.file) {
      const { path: url, filename } = req.file;
      newListing.image = { url, filename };
    } else {
      newListing.image = {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        filename: "default",
      };
    }

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};


module.exports.editListingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // Handling case if editing list does not found.
  if (!listing) {
    req.flash("error", "Requested editing list does not exist!");
    return res.redirect("/listings");
  }

  let previewImage = listing.image.url.replace(
    "/upload",
    "/upload/c_auto,h_200,w_400",
  );
  res.render("../views/listings/edit.ejs", { listing, previewImage });
};


module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    const { path: url, filename } = req.file;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect(`/listings`);
};
