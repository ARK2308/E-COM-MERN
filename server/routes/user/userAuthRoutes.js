const express = require("express");
const router = new express.Router();
const userUpload = require("../../Multerconfig/user/userStorageConfig")
const { userRegister ,userLogin , userVerify , userLogout ,forgotPassword} = require("../../controllers/user/userControllers");
const userauthenticate = require("../../Middleware/user/userauthenticate")


router.post("/register" , userUpload.single("userprofile") , userRegister)
router.post("/login" , userLogin)

router.get("/userloggedin" ,userauthenticate , userVerify)
router.get("/logout",userauthenticate, userLogout);
router.post("/forgotpassword", forgotPassword);









module.exports = router;