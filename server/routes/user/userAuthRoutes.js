const express = require("express");
const router = new express.Router();
const userUpload = require("../../Multerconfig/user/userStorageConfig")
const { userRegister ,userLogin , userVerify} = require("../../controllers/user/userControllers");
const userauthenticate = require("../../Middleware/user/userauthenticate")


router.post("/register" , userUpload.single("userprofile") , userRegister)
router.post("/login" , userLogin)

router.get("/userloggedin" ,userauthenticate , userVerify)










module.exports = router;