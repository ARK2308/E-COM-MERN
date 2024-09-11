const userDB = require("../../models/user/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "zhfgblkSNfKGncv";

const userauthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifyToken = jwt.verify(token, SECRET_KEY);

    const rootUser = await userDB.findOne({ _id: verifyToken._id });
    console.log("token ", rootUser);

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    req.userMainId = rootUser.id;

    next();
  } catch (error) {
    res.status(400).json({ error: "Unauthorized No token Provide" });
  }
};

module.exports = userauthenticate;
