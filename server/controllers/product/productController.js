const categorydb = require("../../models/product/productCategoryModel");
const cloudinary = require("../../Cloudinary/cloudinary");
const productsdb = require("../../models/product/productModel");



exports.addCategory = async (req, res) => {
    const {    categoryname ,  description } =req.body
    if(!categoryname || !description){
        res.status(400).json({error:"Fill All Details"})
    }

    try {
        const existingcategory = await categorydb.findOne({categoryname:categoryname});

        if(existingcategory){
            res.status(400).json({error:"This Category Already Exist"});
        }else{
            const addCategory = new categorydb({
                categoryname ,description
            });

            await addCategory.save();

            res.status(200).json(addCategory)
        }
    } catch (error) {
        res.status(400).json(error)
    }

}


exports.getCategory = async(req ,res)=>{
    try {
        const getAllcategory = await categorydb.find();
        res.status(200).json(getAllcategory)
    } catch (error) {
        res.status(400).json(error)
        
    }
}

// ADD PRODUCTS 
exports.addProduct = async(req ,res)=>{
    const {categoryid} = req.query;
    const file = req.file ? req.file.path :""
    const {productname,price,discount,quantity,description} = req.body;

    if(!productname || !price || !discount || !quantity || !description || !file){
        res.status(400).json({error:"all filed required"});
    }

    try {
        const upload = await cloudinary.uploader.upload(file);

        const existingProduct = await productsdb.findOne({productname:productname});

        if(existingProduct){
            res.status(400).json({error:"THis Product Already Exist"});
        }else{
            const addProduct = new productsdb({
                productname,price,discount,quantity,description,categoryid,productimage:upload.secure_url
            });

            await addProduct.save();
            res.status(200).json(addProduct)
        }
    } catch (error) {
        res.status(400).json(error);
    }
   
}