const express = require("express");
const router = new express.Router();
const userauthenticate = require("../../Middleware/user/userauthenticate");
const  {processpayment}  = require("../../controllers/payment/paymentControllers");

// Payment route
router.post("/payment", userauthenticate, processpayment);

module.exports = router;
