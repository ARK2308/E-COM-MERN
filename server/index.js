require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4300;

// database connection code

const db = require("./db/connect.js");
db.connect();

// routes created to show this on sever

app.get("/", (req, res) => {
  res.status(200).json("server is running");
});

app.use(cors());
app.use(express.json());

// admin routes
const adminAuthroutes = require("./routes/admin/adminAuthroutes.js");
app.use("/api", adminAuthroutes);

// product routes
const productroutes = require("./routes/products/productroutes.js");
app.use("/product/api", productroutes);

// user routes
const userAuthRoutes = require("./routes/user/userAuthRoutes.js");
app.use("/userAuth/api", userAuthRoutes);

// carts routes
const cartsRoutes = require("./routes/carts/cartsRoutes.js");
app.use("/carts/api",cartsRoutes);

// payment routes
const paymentroutes = require("./routes/payment/PaymentRoutes.js");
app.use("/checkout/api", paymentroutes);


// order routes 
const orderroutes = require("./routes/order/orderRoutes.js");
app.use("/order/api", orderroutes);

// start server

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
