const Joi = require("joi");


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow("", null),

        category: Joi.string()
            .valid(
                "Amazing Views",
                "Trending",
                "Bed & Breakfasts",
                "Arctic",
                "Camping",
                "Amazing Pools",
                "Castles"
            )
            .required(),
    }).required(),
});



module.exports.bookingSchema = Joi.object({

    listingId: Joi.string()
        .required(),

    arrivalDate: Joi.date()
        .required(),

    departureDate: Joi.date()
        .greater(Joi.ref("arrivalDate"))
        .required(),

    guests: Joi.number()
        .integer()
        .min(1)
        .max(20)
        .required(),

    purpose: Joi.string()
        .valid(
            "Vacation",
            "Business",
            "Family Visit",
            "Workation",
            "Medical",
            "Adventure",
            "Education",
            "Other"
        )
        .required(),

    specialRequirements: Joi.string()
        .allow("")
        .default(""),

    message: Joi.string()
        .min(10)
        .max(500)
        .required()

});