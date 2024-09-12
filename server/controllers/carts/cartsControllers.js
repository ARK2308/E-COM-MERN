const productsdb = require("../../models/product/productModel");
const cartsdb = require("../../models/carts/cartsModel");


exports.addToCart = async (req, res) => {
  const { id } = req.params;

  try {
    const productfind = await productsdb.findOne({ _id: id });
    const carts = await cartsdb.findOne({ userid: req.userId, productid: productfind._id });
     console.log("carts",carts)
    if (carts?.quantity >= 1) {
            // add to cart
            carts.quantity = carts.quantity + 1
            await carts.save();
            res.status(200).json({ message: "Product Sucessfully Increment In your cart" });
    } else {
        const addtocart = new cartsdb({
            userid: req.userId,
            productid: productfind._id,
            quantity: 1
        });

        await addtocart.save();
        res.status(200).json({ message: "Product Sucessfully Added In your cart" });
    }
  } catch (error) {}
};
