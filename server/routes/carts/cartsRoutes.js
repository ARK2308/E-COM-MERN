const express = require("express");
const userauthenticate = require("../../Middleware/user/userauthenticate");
const {addToCart ,getCartsValue ,removeSingleitem ,removeAllitem ,deleteCartsData  } = require("../../controllers/carts/cartsControllers")
const router = new express.Router();


// carts routes
router.post("/addtocart/:id",userauthenticate, addToCart);
router.get("/getcarts",userauthenticate, getCartsValue);
router.delete("/removesingleitem/:id",userauthenticate, removeSingleitem);
router.delete("/removeallitems/:id",userauthenticate,removeAllitem);


// delete carts data when order done
router.delete("/removecartdata",userauthenticate, deleteCartsData);






module.exports = router;


