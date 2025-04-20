const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConnectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} status type is invalid!!`
        }
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('ConnectionRequest', ConnectionRequestSchema);