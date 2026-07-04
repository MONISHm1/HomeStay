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



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});