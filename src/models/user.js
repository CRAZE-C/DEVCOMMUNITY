const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error('Invalid gender');
            }
        },
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: true
    },
    about: {
        type: String,
        minLength: 10,
        maxLength: 50,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 12,
        validate(value) {
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value))) {
                throw new Error("Password should contain at least one lowercase letter, one uppercase letter, one digit and one special character");
            }
        },
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc",
    },
    skills: {
        type: String,
        minLength: 1,
        maxLength: 10
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        minLength: 10,
        maxLength: 100
    },
    jobRole: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);