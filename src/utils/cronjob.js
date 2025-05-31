const { subDays, startOfDay, endOfDay } = require('date-fns');
const cronjob = require('node-cron');
const sendEmail = require("./sendEmail")
const ConnectionRequestModel = require("../models/connectionRequest");

cronjob.schedule("0 8 * * *", async () => {
    try {
        const previousDay = subDays(new Date(), 1);
        const previousDayStart = startOfDay(previousDay);
        const previousDayEnd = endOfDay(previousDay);

        const requestsPending = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: previousDayStart,
                $lt: previousDayEnd
            }
        }).populate("fromUserId toUserId")

        const listOfEmails = [...new Set(requestsPending.map((req) => req.toUserId.email))]

        for (const email of listOfEmails) {
            try {
                const res = await sendEmail.run(
                    "Friend Request Pending!!!",
                    `You have recieved a friend request from ${email}. Visit DevCommunity to see the profile!!!`
                )
                console.log(res);
            }
            catch (err) {
                console.error("ERROR: " + err);
            }
        }
    }
    catch (err) {
        res.send("ERROR: " + err)
    }
})