const cloudinary = require("../../Cloudinary/cloudinary");
const userDB = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "zhfgblkSNfKGncv";
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const { transporter } = require("../../helper");

exports.userRegister = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  if (
    !firstname ||
    !email ||
    !lastname ||
    !password ||
    !confirmpassword ||
    !req.file
  ) {
    res.status(400).json({ error: "all fileds are required" });
  }

  const file = req.file?.path;
  const upload = await cloudinary.uploader.upload(file);

  try {
    const preuser = await userDB.findOne({ email: email });

    if (preuser) {
      res.status(400).json({ error: "this user is already exist" });
    } else if (password !== confirmpassword) {
      res
        .status(400)
        .json({ error: "password and confirm password not match" });
    } else {
      const userData = new userDB({
        firstname,
        lastname,
        email,
        password,
        userprofile: upload.secure_url,
      });

      // here password hashing

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "all field require" });
  }

  try {
    const userValid = await userDB.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Details" });
      } else {
        // token generate
        const token = await userValid.generateuserAuthToken();

        const result = {
          userValid,
          token,
        };
        res.status(200).json(result);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.userVerify = async (req, res) => {
  try {
    const verifyUser = await userDB.findOne({ _id: req.userId });
    res.status(200).json(verifyUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.userLogout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currentElement) => {
      return currentElement.token !== req.token;
    });

    req.rootUser.save();
    res.status(200).json({ message: "user Succesfully Logout" });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "enter your email" });
  }

  try {
    const userfind = await userDB.findOne({ email: email });
    if (userfind) {
      // token generate for password change
      const token = jwt.sign({ _id: userfind._id }, SECRET_KEY, {
        expiresIn: "180s",
      });

      const setusertoken = await userDB.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
      // join email path
      const emailTemplatepath = path.join(
        __dirname,
        "../../EmailTemplate/ForgotTemplate.ejs"
      );
      const emailtemplateread = fs.readFileSync(emailTemplatepath, "utf8");

      // Set token and logo value in ejs file
      const data = {
        passwordresetlink: `http://localhost:4300/resetpassword/${userfind.id}/${setusertoken.verifytoken}`,
        logo: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
      };

      // set dynamic datavalue in ejs
      const renderTemplate = ejs.render(emailtemplateread, data);

      if (setusertoken) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For password Reset",
          html: renderTemplate,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("email sent", info.response);
            res.status(200).json({ message: "Email sent Sucessfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "this user is not exist" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.forgotPasswordVerify = async (req , res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userDB.findOne({_id:id,verifytoken:token});

        const verifytoken = jwt.verify(token,SECRET_KEY);

        if(validuser && verifytoken._id){
            res.status(200).json({message:"Valid user"});
        }else{
            res.status(400).json({error:"user not exist"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}


exports.resetPassword = async (req, res)=>{
    const {id,token} = req.params;
    const {password} = req.body;
    try {
        const validuser = await userDB.findOne({_id:id,verifytoken:token});

        const verifytoken = jwt.verify(token,SECRET_KEY);

        if(validuser && verifytoken._id){

            const newpassword = await bcrypt.hash(password,12);

            const setnewpassword = await userDB.findByIdAndUpdate({_id:id},{password:newpassword},{new:true})

            await setnewpassword.save();
            res.status(200).json({message:"Password sucessfully updated"});
        }else{
            res.status(400).json({error:"your session time out please generate newlink"})
        }
       
    } catch (error) {
        res.status(400).json(error)
    }
};