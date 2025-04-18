const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middleware/userAuth');

userRouter.get('/getProfile', userAuth, async (req, res) => {
    try {
        res.send(req.user);
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

module.exports = userRouter;
