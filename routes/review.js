const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview } = require("../utils/middleware.js");
const reviewController = require("../controllers/review.js");


router.post("/", validateReview, wrapAsync(reviewController.addReview));


router.delete("/:reviewId", wrapAsync(reviewController.deleteReview));

module.exports = router;