const  cloudinary  = require("../../Cloudinary/cloudinary");
const userDB = require("../../models/user/userModel");




exports.userRegister = async (req , res)=>{
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    if (!firstname || !email || !lastname || !password || !confirmpassword || !req.file) {
        res.status(400).json({ error: "all fileds are required" })
    }
    
    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file);
    
    try {
        const preuser = await userDB.findOne({email:email});
    
        if(preuser){
            res.status(400).json({error:"this user is already exist"});
        }else if(password !== confirmpassword){
            res.status(400).json({error:"password and confirm password not match"});
        }else{
            const userData = new userDB({
                firstname, lastname, email, password, userprofile:upload.secure_url
            });
    
            // here password hashing
    
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.userLogin = async (req , res)=>{

}