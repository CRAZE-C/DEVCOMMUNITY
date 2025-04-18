const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { loginAuth } = require('../middleware/loginAuth');
const { signupValidation } = require('../utils/validation');

authRouter.post("/signup", async (req, res) => {

    //  const user = new User(req.body); //Dynamic way of getting input from user...

    try {
        // 1. validation
        signupValidation(req);

        const { firstName, lastName, email, password } = req.body;

        // 2. Encryption
        const encryptedPass = await bcrypt.hash(password, 10);

        // 3. Save to DB
        const user = new User({
            firstName,
            lastName,
            email,
            password: encryptedPass
        });
        await user.save();

        res.send("New user is created successfully...");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post('/login', loginAuth, async (req, res) => {
    try {
        res.send("Login successful!!!");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post('/logout', (req, res) => {
    res
        .cookie('token', null, {
            expire: new Date(Date.now())
        })
        .send("Logout Successful!!");
});

module.exports = authRouter;