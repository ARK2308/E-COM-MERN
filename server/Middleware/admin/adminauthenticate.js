const adminDB = require("../../models/admin/adminModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "kjxfnvkfhzfnblif";

const adminauthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, SECRET_KEY);
    const rootUser = await adminDB.findOne({ _id: verifyToken._id });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser =  rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {}
};

module.exports = adminauthenticate;
