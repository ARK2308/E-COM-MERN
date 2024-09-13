const express = require("express");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");
const {addCategory , getCategory , addProduct ,getAllProducts ,getSingleProduct ,getLatestProducts ,deleteProducts ,productReview ,getProductReview ,deleteProductReview} = require("../../controllers/product/productController")
const productupload = require("../../Multerconfig/products/productStorageConfig");
const router = new express.Router();
const userAuthenticate = require("../../Middleware/user/userauthenticate")


// product category route
router.post("/addcategory" , adminauthenticate , addCategory)
router.get("/getcategory" , getCategory)

// products routes 
router.post("/addproduct" , [adminauthenticate, productupload.single("productimage")], addProduct)
router.get("/getproducts" , getAllProducts)
router.get("/getsingleproduct/:productid", getSingleProduct);
router.delete("/deleteproducts/:productid",adminauthenticate, deleteProducts);

// new arrival product
router.get("/getlatestproducts", getLatestProducts);

// products review api
router.post("/productreview/:productid", userAuthenticate, productReview);
router.get("/getProductreview/:productid", getProductReview);
router.delete("/productreviewdelete/:reviewid",userAuthenticate, deleteProductReview);


 
module.exports = router;