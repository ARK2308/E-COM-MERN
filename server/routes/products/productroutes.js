const express = require("express");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");
const router = new express.Router();
const productController = require("../../controllers/product/productController");

router.post("/addcategory", adminauthenticate, productController.AddCategory);
router.get("/getcategory",productController.GetCategory);

module.exports = router;