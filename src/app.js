const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const { signupValidation } = require('./utils/validation');
const { loginAuth } = require('./utils/loginAuth');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json()); //middleware for converting json into JS object...

app.get("/user", async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if (user.length === 0)
            res.status(404).send("User not found...");
        else
            res.send(user);
    }
    catch (err) {
        res.send("Something went wrong!!!");
    }
});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.send("Something went wrong!!!");
    }
});

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
        res.status(400).send("Bad request..." + err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        loginAuth(req,res);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

app.delete("/user", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        res.send("User is deleted successfully...");
    }
    catch (err) {
        res.send("Something went wrong!!!");
    }
});

app.patch("/user/:userID", async (req, res) => {
    const userID = req.params?.userID;
    try {
        const data = req.body;
        const Blocked_Updates = ["_id", "email", "age", "phoneNumber", "dob"];
        const isBlocked = Object.keys(data).some((k) => Blocked_Updates.includes(k));
        if (isBlocked)
            throw new Error("This field cannot be updated!!!");
        const user = await User.findByIdAndUpdate(
            userID, data,
            { returnDocument: 'after', runValidators: true });
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database connection failed!!!");
    });
