const express = require("express");
const router = new express.Router();
const userUpload = require("../../Multerconfig/user/userStorageConfig")
const { userRegister ,userLogin} = require("../../controllers/user/userControllers");


router.post("/register" , userUpload.single("userprofile") , userRegister)
router.post("/login" , userLogin)










module.exports = router;