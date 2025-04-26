const User = require('../models/user');

const loginAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // find() returns an array, So we can't directly check the user.password
        const user = await User.findOne({ email: email });
        if (!user)
            throw new Error("Invalid credentials!!");
        const isValid = await user.validatePassword(password);
        if (isValid) {
            // Create JWT token
            const token = await user.getJWT();
            if (!token) {
                throw new Error("Token expired!!!");
            }
            // Add the token to the cookie and send it back to the user
            res.cookie('token', token, { expires: new Date(Date.now() + 3600000) }); //maxAge: 3600000(only accepts number not strings)
            req.user = user;
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