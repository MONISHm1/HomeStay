const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Show Stay Request Form
module.exports.showRequestForm = async (req, res) => {
    const { listingId } = req.params;

    const listing = await Listing.findById(listingId).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    if (listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You cannot request your own property.");
        return res.redirect(`/listings/${listing._id}`);
    }

    res.render("bookings/request", { listing });
};

// Create Stay Request
module.exports.createBooking = async (req, res) => {
    const {
        listingId,
        arrivalDate,
        departureDate,
        guests,
        purpose,
        specialRequirements,
        message,
    } = req.body;

    const listing = await Listing.findById(listingId).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    if (listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You cannot request your own property.");
        return res.redirect(`/listings/${listing._id}`);
    }

    if (new Date(arrivalDate) >= new Date(departureDate)) {
        req.flash("error", "Departure date must be after arrival date.");
        return res.redirect(`/bookings/new/${listing._id}`);
    }

    const booking = new Booking({
        listing: listing._id,
        listingTitle: listing.title,
        listingImage: listing.image.url,
        listingLocation: listing.location,
        listingCountry: listing.country,
        guest: req.user._id,
        host: listing.owner._id,
        arrivalDate,
        departureDate,
        guests,
        purpose,
        specialRequirements,
        message,
    });

    await booking.save();

    req.flash("success", "Stay request sent successfully.");
    res.redirect("/bookings/my-requests");
};

// Guest Dashboard
module.exports.guestDashboard = async (req, res) => {
    const bookings = await Booking.find({
        guest: req.user._id,
    })
        .populate("host", "username email")
        .sort({ createdAt: -1 });
    const bookingStats = {
        total: bookings.length,
        pending: bookings.filter(
            booking => booking.status === "Pending"
        ).length,
        accepted: bookings.filter(
            booking => booking.status === "Accepted"
        ).length,
        rejected: bookings.filter(
            booking => booking.status === "Rejected"
        ).length,
        cancelled: bookings.filter(
            booking => booking.status === "Cancelled"
        ).length,
        completed: bookings.filter(
            booking => booking.status === "Completed"
        ).length,
    };

    // Active Stay Requests
    const activeBookings = bookings.filter(
        booking =>
            booking.status === "Pending" ||
            booking.status === "Accepted"
    ).length;

    // Recent Activity
    const recentBookings = bookings.slice(0, 5);

    res.render("bookings/guest", {
        bookings,
        bookingStats,
        activeBookings,
        recentBookings,
    });

};

// Host Dashboard
module.exports.hostDashboard = async (req, res) => {
    const bookings = await Booking.find({
        host: req.user._id,
    })
        .populate("guest")
        .sort({ createdAt: -1 });
        
    const stats = {
        total: bookings.length,

        pending: bookings.filter(
            booking => booking.status === "Pending"
        ).length,

        accepted: bookings.filter(
            booking => booking.status === "Accepted"
        ).length,

        rejected: bookings.filter(
            booking => booking.status === "Rejected"
        ).length,

        cancelled: bookings.filter(
            booking => booking.status === "Cancelled"
        ).length,

        completed: bookings.filter(
            booking => booking.status === "Completed"
        ).length,
    };

    // Render Host Dashboard
    res.render("bookings/host", {
        bookings,
        stats,
    });
};

// Booking Details
module.exports.showBooking = async (req, res) => {

    const booking = await Booking.findById(req.params.id)
        .populate("guest")
        .populate("host");

    // Booking not found
    if (!booking) {
        req.flash("error", "Stay request not found.");
        return res.redirect("/bookings/my-requests");
    }

    // Only the guest or the host can view this booking
    const isGuest = booking.guest._id.equals(req.user._id);
    const isHost = booking.host._id.equals(req.user._id);

    if (!isGuest && !isHost) {
        req.flash("error", "You are not authorized to view this stay request.");
        return res.redirect("/listings");
    }

    res.render("bookings/details", {
        booking,
    });

};

// Accept Stay Request
module.exports.acceptBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        req.flash("error", "Request not found.");
        return res.redirect("/bookings/host");
    }

    booking.status = "Accepted";
    await booking.save();

    req.flash("success", "Stay request accepted.");
    res.redirect("/bookings/host");
};

// Reject Stay Request
module.exports.rejectBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        req.flash("error", "Request not found.");
        return res.redirect("/bookings/host");
    }

    booking.status = "Rejected";
    await booking.save();

    req.flash("success", "Stay request rejected.");
    res.redirect("/bookings/host");
};

// Cancel Stay Request
module.exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        req.flash("error", "Request not found.");
        return res.redirect("/bookings/my-requests");
    }

    booking.status = "Cancelled";
    await booking.save();

    req.flash("success", "Stay request cancelled.");
    res.redirect("/bookings/my-requests");
};