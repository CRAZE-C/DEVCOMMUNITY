const validator = require('validator');
const bcrypt = require('bcrypt');

const signupValidation = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName)
        throw new Error("Enter the name!!!");
    else if (!email)
        throw new Error("Enter the email!!!");
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

const validatePassword = async (req, user) => {
    const { oldPassword, newPassword } = req.body;
    const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidOldPassword)
        return false;
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