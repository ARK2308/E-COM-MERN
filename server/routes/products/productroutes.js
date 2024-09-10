const express = require("express");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");
const {addCategory , getCategory} = require("../../controllers/product/productController")
const router = new express.Router();


// product category route
router.post("/addcategory" , adminauthenticate , addCategory)

// get category 
router.get("/getcategory" , getCategory)




module.exports = router;