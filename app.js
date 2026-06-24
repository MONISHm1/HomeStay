const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/homestay")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const listingRoutes = require("./routes/listing");
app.use("/listings", listingRoutes);

// Home Route
app.get("/", (req, res) => {
    res.redirect("/listings");
});
const reviewRoutes = require("./routes/review");
app.use("/listings/:id/reviews", reviewRoutes);

const userRoutes = require("./routes/user");
app.use("/", userRoutes);

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});