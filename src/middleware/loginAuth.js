const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // find() returns an array, So we can't directly check the user.password
        const user = await User.findOne({ email: email });
        if (!user)
            throw new Error("Invalid credentials!!");
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // Create JWT token
            const token = jwt.sign({ _id: user._id }, "DEV#Community", { expiresIn: 30 });
            if (!token) {
                throw new Error("Token expired!!!");
            }
            // Add the token to the cookie and send it back to the user
            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) });
            next();
        }
        else
            throw new Error("Invalid credentials!!");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}

module.exports = { loginAuth };