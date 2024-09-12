const productsdb = require("../../models/product/productModel");
const cartsdb = require("../../models/carts/cartsModel");

exports.addToCart = async (req, res) => {
  const { id } = req.params;

  try {
    const productfind = await productsdb.findOne({ _id: id });

    const carts = await cartsdb.findOne({
      userid: req.userId,
      productid: productfind._id,
    });
    // console.log("productfind",productfind)

    if (productfind?.quantity >= 1) {
      if (carts?.quantity >= 1) {
        // add to cart
        carts.quantity = carts.quantity + 1;
        await carts.save();

        // decfrement product quantity
        productfind.quantity = productfind.quantity - 1;
        await productfind.save();

        res
          .status(200)
          .json({ message: "Product Sucessfully Increment In your cart" });
      } else {
        const addtocart = new cartsdb({
          userid: req.userId,
          productid: productfind._id,
          quantity: 1,
        });

        await addtocart.save();

        productfind.quantity = productfind.quantity - 1;
        await productfind.save();

        res
          .status(200)
          .json({ message: "Product Sucessfully Added In your cart" });
      }
    } else {
      res.status(400).json({ error: "This Product Is Sold Out" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// getCartsValue
exports.getCartsValue = async (req, res) => {
  try {
    const getCarts = await cartsdb.aggregate([
      {
        $match: { userid: req.userMainId },
      },
      {
        $lookup: {
          from: "productsmodels",
          localField: "productid",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ]);
    res.status(200).json(getCarts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// removeSingleiteam
exports.removeSingleiteam = async (req, res) => {
  const { id } = req.params;
  try {
    const productfind = await productsdb.findOne({ _id: id });

    const carts = await cartsdb.findOne({
      userid: req.userId,
      productid: productfind._id,
    });

    if (!carts) {
      res.status(400).json({ error: "cart item not found" });
    }

    console.log("carts", carts);

    if (carts.quantity == 1) {
      const deleteCartItem = await cartsdb.findByIdAndDelete({
        _id: carts._id,
      });
      // console.log("deleteCartItem",deleteCartItem)

      // increment product quantity
      productfind.quantity = productfind.quantity + 1;
      await productfind.save();
      res.status(200).json({
        message: "Your Iteam sucessfully remove in your cart",
        deleteCartItem,
      });
    } else if (carts.quantity > 1) {
      carts.quantity = carts.quantity - 1;
      await carts.save();

      // increment product quantity
      productfind.quantity = productfind.quantity + 1;
      await productfind.save();
      res
        .status(200)
        .json({ message: "Your Iteam Sucessfully Decrement In your Cart" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
