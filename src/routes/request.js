const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/userAuth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status))
            return res.status(400).json({ message: "Invalid status: " + status });

        const isToUserExists = await User.findById(toUserId);
        if (!isToUserExists)
            return res.status(400).json({ message: "User not found" });

        const connectionRequest = new ConnectionRequest({
            toUserId,
            fromUserId,
            status
        });

        const isConnectionRequestAlreadyExists = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (isConnectionRequestAlreadyExists) {
            throw new Error("Connection request already exists!!");
        }

        const data = await connectionRequest.save();
        res.status(200).send({
            message: 'Status ' + status + ' sent successfully to ' + isToUserExists.firstName,
            data
        });
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status))
            throw new Error(`Status "${status}" is invalid`);

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUserId,
            status: 'interested'
        });
        if (!connectionRequest)
            throw new Error("Connection Request not found!!");

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.status(200).json({
            message: connectionRequest.fromUserId.firstName + "Connection request is " + status,
            data
        });
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = requestRouter;