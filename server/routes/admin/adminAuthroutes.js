const express = require("express");
const router = new express.Router();
const {Register, login,} = require('../../controllers/admin/adminControllers');
// const adminAuthcontroller = require("../../controllers/admin/adminControllers");
const adminuploads = require("../../Multerconfig/admin/adminstorageconfig");









router.post("/register" ,adminuploads.single("admin_profile"), Register);
router.post("/login" ,login);




// Example middleware function
// const exampleMiddleware = (req, res, next) => {
//   console.log('Middleware executed');
//   next();
// };

// Apply middleware to all routes in the router
// router.use(exampleMiddleware);

// Admin auth routes
// When we want to store some data in our database
// we will use post routes


//   // Your registration logic here
//   res.send("Registration endpoint");


module.exports = router;
