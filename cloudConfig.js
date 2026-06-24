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
        return {
            folder: "HomeStay",
            resource_type: "image", 
            allowed_formats: ["jpg", "jpeg", "png"], 
            public_id: Date.now() + "-" + file.originalname
        };
    }
});

module.exports = { cloudinary, storage };







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