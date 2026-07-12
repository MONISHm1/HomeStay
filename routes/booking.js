const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, 
        validateBooking,
        isBookingGuest,
        isBookingHost, } = require("../utils/middleware");
const bookingController = require("../controllers/booking");


router.get(
    "/new/:listingId",
    isLoggedIn,
    wrapAsync(bookingController.showRequestForm)
);


router.post(
    "/",
    isLoggedIn,
    validateBooking,
    wrapAsync(bookingController.createBooking)
);


router.get(
    "/my-requests",
    isLoggedIn,
    wrapAsync(bookingController.guestDashboard)
);


router.get(
    "/host",
    isLoggedIn,
    wrapAsync(bookingController.hostDashboard)
);


router.get(
    "/:id",
    isLoggedIn,
    wrapAsync(bookingController.showBooking)
);


router.patch(
    "/:id/accept",
    isLoggedIn,
    isBookingHost,
    wrapAsync(bookingController.acceptBooking)
);


router.patch(
    "/:id/reject",
    isLoggedIn,
    isBookingHost,
    wrapAsync(bookingController.rejectBooking)
);


router.patch(
    "/:id/cancel",
    isLoggedIn,
    isBookingGuest,
    wrapAsync(bookingController.cancelBooking)
);


router.patch(
"/:id/complete",
isLoggedIn,
isBookingHost,
wrapAsync(bookingController.completeBooking)
);

module.exports = router;