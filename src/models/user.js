const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: false
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
        unique: [true, 'Email already exists'],
        validate: [validator.isEmail, 'Please fill a valid email address'],
        required: [true, 'Enter the email']
    },
    gender: {
        type: String,
        validate(value) {
            if (!["", "Male", "Female", "Others"].includes(value)) {
                throw new Error('Invalid gender');
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
    },
    about: {
        type: String,
        minLength: 0,
        maxLength: 300,
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
    jobRole: {
        type: String,
        default: "Add your jobRole here...",
        maxLength: 50
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = function () {
    return jwt.sign({ _id: this._id }, process.env.secretOrPrivateKey, { expiresIn: '7d' });
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    return await bcrypt.compare(passwordInputByUser, this.password);
}

module.exports = mongoose.model('User', userSchema);