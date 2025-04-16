const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies; // get the token from the cookie
        if (!token)
            throw new Error("Invalid token!!!");
        const decodedData = jwt.verify(token, "DEV#Community", (err) => {
            if (err) {
                throw new Error(expiredAt + " Token expired");
            }
        }); // verify the token
        const { _id } = decodedData;
        const user = await User.findById(_id); //find the user with the decoded id
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