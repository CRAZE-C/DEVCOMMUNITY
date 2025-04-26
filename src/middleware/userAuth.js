const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        // get the token from the cookie
        const { token } = req.cookies;
        if (!token)
            throw new Error("Invalid token!!!");
        // verify the token
        const decodedData = jwt.verify(token, "DEV#Community"); 
        // destructuring _id from decodedData
        const { _id } = decodedData;
        //find the user with the decoded id
        const user = await User.findById(_id); 
        if (!user)
            throw new Error("User not found!!!");
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}

module.exports = {
    userAuth
}