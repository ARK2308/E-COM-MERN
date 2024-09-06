const mongoose = require("mongoose");

exports.connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
};