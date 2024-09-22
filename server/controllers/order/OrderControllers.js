const orderDb = require("../../models/order/OrderModel")
const moment = require("moment");


// add user order -- user
exports.AddOrders = async (req, res) => {
    const { address, city, pincode, mobile, state, country, orderItems, paymentdetails, itemsPrice, shippingPrice, totalPrice } = req.body;

    const deliverydate = moment().add(2, 'days').format('DD-MM-YYYY');

    try {
        const createOrder = new orderDb({
            userid: req.userId, address, city, pincode, mobile, state, country, orderItems, paymentdetails,
            itemsPrice, shippingPrice, totalPrice, deliveredAt: deliverydate
        });

        await createOrder.save();

        res.status(200).json(createOrder)
    } catch (error) {
        res.status(400).json(error);
    }
}

// getUserOrders -- user
exports.getUserOrders = async (req, res) => {
    try {
        const getUserOrders = await orderDb.find({ userid: req.userId }).sort({ _id: -1 });

        res.status(200).json(getUserOrders)
    } catch (error) {
        res.status(400).json(error);
    }
}


// getAllOrders -- admin
exports.getAllOrders = async (req, res) => {
    try {
        const getOrders = await orderDb.find().sort({ _id: -1 });
        res.status(200).json(getOrders)
    } catch (error) {
        res.status(400).json(error);
    }
}


exports.updateOrderStatus = async (req, res) => {
    
}