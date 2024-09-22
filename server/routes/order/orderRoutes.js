const express = require("express");
const router = new express.Router();
const userauthenticate = require("../../Middleware/user/userauthenticate");
const{AddOrders,getUserOrders,getAllOrders,updateOrderStatus} = require("../../controllers/order/OrderControllers");
const adminauthenticate = require("../../Middleware/admin/adminauthenticate");

// order routes
// for user module
router.post("/addorders",userauthenticate,AddOrders);
router.get("/getuserorders",userauthenticate,getUserOrders);

// for admin
router.get("/orders",adminauthenticate, getAllOrders);
router.put("/orders/:orderid",adminauthenticate,updateOrderStatus);




module.exports = router;