const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const { signupValidation } = require('./utils/validation');
const { loginAuth } = require('./middleware/loginAuth');
const {userAuth} = require('./middleware/userAuth');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json()); //middleware for converting json into JS object...
app.use(cookieParser()); //middleware for parsing cookies

app.get('/getProfile',userAuth, async (req, res) => {
    try {
        res.send(req.user);
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

app.post("/signup", async (req, res) => {

    //  const user = new User(req.body); //Dynamic way of getting input from user...

    try {
        // 1. validation
        signupValidation(req);

        const { firstName, lastName, email, password } = req.body;

        // 2. Encryption
        const encryptedPass = await bcrypt.hash(password, 10);

        // 3. Save to DB
        const user = new User({
            firstName,
            lastName,
            email,
            password: encryptedPass
        });
        await user.save();

        res.send("New user is created successfully...");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post('/login', loginAuth, async (req, res) => {
    try {
        res.send("Login successful!!!");
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database connection failed!!!" + err.message);
    });
