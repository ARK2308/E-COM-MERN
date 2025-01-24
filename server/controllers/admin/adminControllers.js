const adminDB = require("../../models/admin/adminModel");
const cloudinary = require("../../Cloudinary/cloudinary");
const bcrypt = require("bcryptjs");

// register controllers
// POST method 
exports.Register = async (req, res) => {
  const { name, email, mobile, password, confirmpassword } = req.body;

  // Corrected the conditional check for confirmpassword
  if (
    !name ||
    !email ||
    !mobile ||
    !password ||
    !confirmpassword ||
    !req.file
  ) {
    return res.status(400).json({ error: "All Fields are required" });
  }

  const file = req.file?.path;
  try {
    const upload = await cloudinary.uploader.upload(file);

    const preuser = await adminDB.findOne({ email: email });
    const mobileverification = await adminDB.findOne({ mobile: mobile });

    if (preuser) {
      return res.status(400).json({ message: "This email already exists" });
    } else if (mobileverification) {
      return res
        .status(400)
        .json({ message: "This mobile number already exists" });
    } else if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password did not match" });
    } else {
      const adminData = new adminDB({
        name,
        email,
        mobile,
        profile: upload.secure_url,
        password,
      });

      await adminData.save();
      return res.status(200).json(adminData);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

// login controller
// POST method
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const adminValid = await adminDB.findOne({ email: email });
    if (adminValid) {
      const isMatch = await bcrypt.compare(password, adminValid.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Details" });
      } else {
        // token generate
        const token = await adminValid.generateAuthToken();
        const result = {
          adminValid,
          token,
        };
        res.status(200).json(result);
      }
    } else {
      return res.status(400).json({ error: "Invalid Details" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// admin verify conroller
exports.AdminVerify = async (req, res) => {
  try {
    const verifyadmin = await adminDB.findOne({_id:req.userId});
    if(!verifyadmin){
        return res.status(400).json({error:"Admin not verified"});
    }
    return res.status(200).json(verifyadmin);
} catch (error) {
    res.status(500).json({error:"Invalid Credentials"});
}
};

// admin logout controller
// Get method
exports.Logout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currentUser)=>{
      return currentUser.token !== req.token;
  });

  req.rootUser.save();
  res.status(200).json({message:"Admin Successfully Logout"});
  } catch (error) {
    res.status(400).json(error);
  }
}