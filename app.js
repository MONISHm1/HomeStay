
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
console.log("ATLAS URL:", process.env.ATLAS_DB_URL); 

console.log("ENV CHECK:", {
    NODE_ENV: process.env.NODE_ENV,
    SECRET: !!process.env.SECRET,
    ATLAS_DB_URL: !!process.env.ATLAS_DB_URL,
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const bookingRouter = require("./routes/booking");


// Requiring Express Router files.
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Setting for project requirements.
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
console.log("Static path:", path.join(__dirname, "/public")); 

const cloudDatabaseUrl = process.env.ATLAS_DB_URL; 


/* Database connectivity setup */
async function main() {
    await mongoose.connect(cloudDatabaseUrl);
    console.log("Database connected.");
}

main().catch((err) => console.log(err));



const store = MongoStore.create({
    mongoUrl: cloudDatabaseUrl,
    crypto: {
        secret: process.env.SECRET || "fallbacksecret",
    },
    touchAfter: 24 * 3600,
    stringify: false,
});

// Handling Error if session store fails.
store.on("error", (error) => {
    console.log("ERROR in MONGO SESSION STORE!",error);
   
    console.error(error);
});

// express-session parameters.
const sessionOptions = {
    store: store, 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
},
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flsh Message Middleware.
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; 
    next();
});

// Home Route
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/listings");
    }
    res.redirect("/login");
});
// Express Routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/bookings", bookingRouter);
app.use("/", userRouter);
app.use("/.well-known", (req, res) => {
    res.status(204).end();
});


// Footer Static Pages
app.get("/privacy", (req, res) => res.render("static/privacy.ejs"));
app.get("/terms", (req, res) => res.render("static/terms.ejs"));
app.get("/sitemap", (req, res) => res.render("static/sitemap.ejs"));
app.get("/company-details", (req, res) => res.render("static/company.ejs"));
// Middlewares
app.use((req, res, next) => {
     console.log("❌ 404 HIT:", req.originalUrl);
   next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    console.log("FULL ERROR:", err);
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});



app.listen(8080, () => {
    console.log("Server is running on localhost: 8080");
});