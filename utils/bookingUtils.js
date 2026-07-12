const Booking = require("../models/booking");

const hasDateConflict = async (
    listingId,
    arrivalDate,
    departureDate,
    excludeBookingId = null
) => {

    const query = {
        listing: listingId,
        status: "Accepted",
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const acceptedBookings = await Booking.find(query);

    const newArrival = new Date(arrivalDate);
    const newDeparture = new Date(departureDate);

    for (const booking of acceptedBookings) {

        const existingArrival = new Date(booking.arrivalDate);
        const existingDeparture = new Date(booking.departureDate);

        const overlaps =
            newArrival < existingDeparture &&
            newDeparture > existingArrival;

        if (overlaps) {
            return true;
        }
    }

    return false;
};

module.exports = {
    hasDateConflict,
};