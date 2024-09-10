const express = require("express");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");
const {addCategory , getCategory , addProduct ,getAllProducts} = require("../../controllers/product/productController")
const productupload = require("../../Multerconfig/products/productStorageConfig");
const router = new express.Router();


// product category route
router.post("/addcategory" , adminauthenticate , addCategory)
router.get("/getcategory" , getCategory)

// products routes 
router.post("/addproduct" , [adminauthenticate, productupload.single("productimage")], addProduct)
router.get("/getproducts" , getAllProducts)




module.exports = router;