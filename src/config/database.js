const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Dharan-Raj:mikimini%401437@solitary-knight.livos.mongodb.net/"
    );
}

module.exports = {
    connectDB
}