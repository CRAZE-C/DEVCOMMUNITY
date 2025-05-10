const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Dharan-Raj:AYv2xpw3SKmJKHwU@solitary-knight.livos.mongodb.net/devCommunity"
    );
}

module.exports = {
    connectDB
}