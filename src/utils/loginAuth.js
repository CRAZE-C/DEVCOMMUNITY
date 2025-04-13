const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginAuth = async (req,res) => {
    const { email, password } = req.body;
    // find() returns an array, So we can't directly check the user.password
    const user = await User.findOne({ email: email });
    if (!user)
        throw new Error("Invalid credentials!!");
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid)
        res.send("Login successful");
    else
        throw new Error("Invalid crendentials!!");
}

module.exports = { loginAuth };