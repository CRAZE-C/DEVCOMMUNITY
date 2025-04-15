const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginAuth = async (req,res) => {
    const { email, password } = req.body;
    // find() returns an array, So we can't directly check the user.password
    const user = await User.findOne({ email: email });
    if (!user)
        throw new Error("Invalid credentials!!");
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid){
        // Create JWT token
        const token = jwt.sign({_id : user._id}, "DEV#Community");
        if(!token)
            throw new Error("Invalid token");
        // Add the token to the cookie and send it back to the user
        res.cookie('token', token);

        res.send("Login successful");
    }
    else
        throw new Error("Invalid crendentials!!");
}

module.exports = { loginAuth };