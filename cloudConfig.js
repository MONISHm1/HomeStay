const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {
        let folder = "HomeStay";

        if (
            req.originalUrl.includes("/profile") ||
            req.originalUrl.includes("/users/profile")
        ) {
            folder = "HomeStay/profile-images";
        }

        return {
            folder,
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = {
    cloudinary,
    storage,
};






// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// });
// console.log("Cloudinary config loaded:", !!process.env.CLOUD_NAME);

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "HomeStay",
//         allowed_formats: ["png", "jpg", "jpeg", "gif"],
//     },
// });

// module.exports = { cloudinary, storage };