const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConnectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} status type is invalid!!`
        }
    },
},
    { timestamps: true }
);

ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); //compound index

ConnectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId))
        throw new Error("You cannot send request to yourself!!");
    next();
});

module.exports = mongoose.model('ConnectionRequest', ConnectionRequestSchema);