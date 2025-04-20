const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/userAuth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const isAllowedStatus = ["ignored", "interested"];
        if (!isAllowedStatus.includes(status))
            return res.status(400).json({ message: "Invalid status: " + status });

        const isToUserExists = await User.findById(toUserId);
        if (!isToUserExists)
            return res.status(400).json({ message: "User not found" });

        if (fromUserId.equals(toUserId))
            throw new Error("You cannot send request to yourself!!");

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
        console.log(data)
        res.status(200).send({
            message: 'Status ' + status + ' sent successfully to ' + isToUserExists.firstName,
            data
        });
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;