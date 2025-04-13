const mongoose = require('mongoose');
const validator = require('validator');

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
        minLength: 1,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please fill a valid email address'],
        required: true
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error('Invalid gender');
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max:100,
    },
    phoneNumber: {
        type: String,
        validate: [validator.isMobilePhone,"Enter a valid MobilePhone number!!!"]
    },
    about: {
        type: String,
        minLength: 10,
        maxLength: 50,
        default: "Add about yourself...",
        trim: true
    },
    password: {
        type: String,
        validate: [validator.isStrongPassword, 'Password should contain at least one lowercase letter, one uppercase letter, one digit and one special character'],
        required: true
    },
    profilePicture: {
        type: String,
        validate: [validator.isURL, "Please enter a valid URL!!!"],
        default: "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc",
    },
    skills: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every((item) => typeof item === "string" && item.trim().length > 0);
            },
            message: "Each skill must be a non-empty trimmed string.",
        },
        set: function (value) {
            return value.map((item) => item.trim());
        }
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
        default: "Add your address here...",
        minLength: 10,
        maxLength: 100
    },
    jobRole: {
        type: String,
        default: "Add your jobRole here...",
        maxLength: 50
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);