const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const signupValidation = async (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName)
        throw new Error("Enter the name!!");
    else if (!email)
        throw new Error("Enter the email!!");
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
        throw new Error("Email already exists!");
    else if (!validator.isEmail(email))
        throw new Error("Enter a valid email address!!!");
    else if (!password)
        throw new Error("Enter the password");
    else if (!validator.isStrongPassword(password))
        throw new Error("Enter a strong password!!!");
}

const validateEditProfile = (req) => {
    const allowedEditProfile = ["firstName", "lastName", "about", "profilePicture", "skills", "adress", "jobRole"];
    const isValid = Object.keys(req.body).every(key => allowedEditProfile.includes(key));
    return isValid;
}

const validatePassword = async (req,user) => {
    const { oldPassword, newPassword } = req.body;
    const isValidOldPassword = await bcrypt.compare(oldPassword, req.user.password);
    if (!isValidOldPassword)
        throw new Error("Invalid old password");
    if (!validator.isStrongPassword(newPassword))
        return { message: "Enter a strong password" };
    else
        return newPassword;
        
}

module.exports = {
    signupValidation,
    validateEditProfile,
    validatePassword
};