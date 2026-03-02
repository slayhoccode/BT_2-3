const mongoose = require("mongoose");

module.exports = async function connectDB() {
    try {
        await mongoose.connect("mongodb://sa:123456@localhost:27017/auth_api?authSource=admin");
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
