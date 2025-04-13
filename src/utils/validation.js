const validator = require('validator');

const signupValidation = (req) => {
    const {firstName , lastName, email, password} = req.body;
    if(!firstName || !lastName)
        throw new Error("Enter the name!!!");
    else if(!validator.isEmail(email))
        throw new Error("Enter a valid email address!!!");
    else if(!password)
        throw new Error("Enter the password");
    else if(!validator.isStrongPassword(password))
        throw new Error("Enter a strong password!!!");
}

module.exports = {signupValidation};