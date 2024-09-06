const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dwfhlmzdj",
    api_key : "845593293542522",
    api_secret: "zLNgpoOgF8XjD2R474zFcBnlgQ0"
});

module.exports = cloudinary;

