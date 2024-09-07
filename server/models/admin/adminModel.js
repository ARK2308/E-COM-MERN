const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "kjxfnvkfhzfnblif";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  profile: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlenght: 10,
    maxlenght: 10,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// password hasting
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// token generate
adminSchema.methods.generateAuthToken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//  schema define krne la mtlb ye hota h ki hmare collection me kon kon si field h

// model define krne ka mtln hota h ki ye hita h ki indrectly hm log collection is create kr rhe h

const adminDB = new mongoose.model("adminDB", adminSchema);
module.exports = adminDB;
