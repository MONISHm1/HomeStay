const express = require("express");
const path = require("path");
const mongoose = require("mongoose");


const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});



mongoose.connect("mongodb://127.0.0.1:27017/stayyaar")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});