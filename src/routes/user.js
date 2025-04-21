const express = require('express');
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName gender age about skills jobRole";
const { userAuth } = require('../middleware/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

userRouter.get('/user/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const receivedRequests = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested"
        }).populate(
            'fromUserId',
            USER_SAFE_DATA
        )

        res.status(200).json({
            message: "Requests fetched...",
            receivedRequests
        });
    }
    catch (err) {
        res.status(400).json("ERROR : " + err.message);
    }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    const loggedInUser = req.user._id;
    console.log(loggedInUser)
    const connectionRequests = await ConnectionRequest.find({
        $or: [
            { toUserId: loggedInUser, status: "accepted" },
            { fromUserId: loggedInUser, status: "accepted" }
        ]
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
        if (row.fromUserId._id.toString() == loggedInUser._id.toString())
            return row.toUserId;
        return row.fromUserId;
    })

    res.status(200).json({ message: data });
});

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const notToShowFeed = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId");//.populate("fromUserId","firstName").populate("toUserId","firstName");

        const excludedUsers = new Set();
        notToShowFeed.forEach((req) => {
            excludedUsers.add(req.fromUserId.toString());
            excludedUsers.add(req.toUserId.toString());
        });
        console.log(excludedUsers);
        const feedUsers = await User.find({
            $and: [
                { _id: { $nin: Array.from(excludedUsers) } },
                // {_id: {$ne: loggedInUser}}
            ]
        }).select(USER_SAFE_DATA);

        res.status(200).send({
            message: feedUsers
        })
    }
    catch (err) {
        res.status(400).json({
            message: "ERROR : " + err.message
        });
    }
});

module.exports = userRouter;