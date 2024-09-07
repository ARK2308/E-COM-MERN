const express = require("express");
const router = new express.Router();
const { Register, Login, AdminVerify } = require("../../controllers/admin/adminControllers");
const adminuploads = require("../../Multerconfig/admin/adminstorageconfig");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");

// admin auth route

router.post("/register", adminuploads.single("admin_profile"), Register);
router.post("/login", Login);

// admin verify 
router.get("/adminverify", adminauthenticate, AdminVerify)

module.exports = router;