const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');
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

    const user = new User(req.body); //Dynamic way of getting input from user...

    try {
        await user.save();
        res.send("New user is created successfully...");
    } catch(err) {
        res.status(400).send("Bad request..." + err.message);
    }
});

app.delete("/user", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        res.send("User is deleted successfully...");
    }
    catch (err) {
        res.send("Something went wrong!!!");
    }
});

app.patch("/user", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.body.email }, req.body, 
            { returnDocument: 'after', runValidators: true });
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Something went wrong!!!");
    }
});

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database is failed to connect!!!");
    });
