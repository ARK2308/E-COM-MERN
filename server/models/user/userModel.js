const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "zhfgblkSNfKGncv"

// user schema
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    userprofile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    // for forgotpassword
    verifytoken:{
        type:String
    }
},{timestamps:true});

// password hashing
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
    next()
});






// user model
const userDB = new mongoose.model("usersDbs",userSchema);

module.exports = userDB;



