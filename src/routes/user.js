const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { userAuth } = require('../middleware/userAuth');
const { validateEditProfile, validatePassword } = require('../utils/validation');

userRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        res.send(req.user);
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
});

userRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        const user = req.user;
        const isEditValid = validateEditProfile(req);
        if (!isEditValid) {
            return res.status(400).json({ message: "Invalid request" });
        }
        // Object.Keys(req.body).forEach(element => {
        //     req.user[element] = req.body[element];            
        // });
        for (const key in req.body) {
            user[key] = req.body[key];
        }
        await user.save();
        res.send("User updated successfully!!");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const user = req.user;
        const newPassword = await validatePassword(req, user);
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send("Password updated successfully!!" + user);
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = userRouter;
