const mongoose = require("mongoose");
const { default: passportLocalMongoose } = require("passport-local-mongoose");



const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        default: "",
    },

    bio: {
        type: String,
        default: "",
    },

    country: {
        type: String,
        default: "",
    },

    avatar: {
        url: {
            type: String,
            // default:
            //     "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        },

        filename: {
            type: String,
            default: "default-avatar",
        },
    },

    joinedAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);