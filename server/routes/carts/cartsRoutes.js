const express = require("express");
const userauthenticate = require("../../Middleware/user/userauthenticate");
const {addToCart ,getCartsValue } = require("../../controllers/carts/cartsControllers")
const router = new express.Router();


// carts routes
router.post("/addtocart/:id",userauthenticate, addToCart);
router.get("/getcarts",userauthenticate, getCartsValue);






module.exports = router;


