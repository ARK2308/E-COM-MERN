const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
     profile : {
        type: String,
        required: true
    },  
     mobile: {
        type: String,
        required: true,
        minlenght: 10,
        maxlenght: 10
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

});
//  schema define krne la mtlb ye hota h ki hmare collection me kon kon si field h 

// model define krne ka mtln hota h ki ye hita h ki indrectly hm log collection is create kr rhe h

const adminDB = new mongoose.model("adminDB", adminSchema);
module.exports = adminDB;

