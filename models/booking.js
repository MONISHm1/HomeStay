const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
{
    bookingId: {
        type: String,
        unique: true,
        index: true,
    },

    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
        index: true,
    },

    listingTitle: {
        type: String,
        required: true,
        trim: true,
    },

    listingImage: {
        type: String,
        required: true,
    },

    listingLocation: {
        type: String,
        required: true,
        trim: true,
    },

    listingCountry: {
        type: String,
        required: true,
        trim: true,
    },

    guest: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    host: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    arrivalDate: {
        type: Date,
        required: true,
    },

    departureDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.arrivalDate;
            },
            message: "Departure date must be after arrival date.",
        },
    },

    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 20,
        default: 1,
    },

    purpose: {
        type: String,
        enum: [
            "Vacation",
            "Business",
            "Family Visit",
            "Workation",
            "Medical",
            "Adventure",
            "Education",
            "Other",
        ],
        required: true,
        trim: true,
    },

    specialRequirements: {
        type: String,
        default: "",
        trim: true,
    },

    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },

  
    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Rejected",
            "Cancelled",
            "Completed",
        ],
        default: "Pending",
        index: true,
    },


    hostResponse: {
        type: String,
        default: "",
        trim: true,
    },

    respondedAt: {
        type: Date,
        default: null,
    },

    cancelledAt: {
        type: Date,
        default: null,
    },
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
}
);


bookingSchema.virtual("totalNights").get(function () {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil(
        (this.departureDate - this.arrivalDate) / oneDay
    );
});

bookingSchema.pre("save", function () {

    if (!this.bookingId) {
        const random = Math.floor(1000 + Math.random() * 9000);
        this.bookingId = `HS-${Date.now()}-${random}`;
    }
});

bookingSchema.index({
    guest: 1,
    status: 1,
});

bookingSchema.index({
    host: 1,
    status: 1,
});

bookingSchema.index({
    createdAt: -1,
});

module.exports = mongoose.model("Booking", bookingSchema);