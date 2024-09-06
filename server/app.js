require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port =  4300 

// database connection code 

const db = require("./db/connect");
db.connect();

// routes created to show this on sever 

app.get("/", (req, res)=>{
 res.status(200).json("server is running");    
})



app.use(cors());
app.use(express.json());

// admin routes 
const adminAuthroutes = require("./routes/admin/adminAuthroutes.js");
app.use("/api", adminAuthroutes);


// start server 

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})