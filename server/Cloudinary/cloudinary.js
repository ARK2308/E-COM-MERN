const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: (process.env.CLOUDINARY_CLOUD),
    api_key : (process.env.CLOUDINARY_APIKEY),
    api_secret: (process.env.CLOUDINARY_API_SCERET)
});

module.exports = cloudinary;

