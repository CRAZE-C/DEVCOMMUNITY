const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/userAuth');

requestRouter.post('/request/interested/:userId', userAuth, async (req, res) => {
    try {
        res.send(req.user.firstName + "Sent a connection...");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;