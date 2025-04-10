const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json()); //middleware for converting json into JS object...

app.post("/signup", async (req, res) => {

    const user = new User(req.body); //Dynamic way of getting input from user...

    try {
        await user.save();
        res.send("New user is created successfully...");
    } catch {
        res.status(400).send("Bad request...");
    }
})

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database is failed to connect!!!");
    });
