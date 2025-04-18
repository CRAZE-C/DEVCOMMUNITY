const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();

const userRouter = require('./routes/user');
const requestRouter = require('./routes/request');
const authRouter = require('./routes/auth');

app.use(express.json()); //middleware for converting json into JS object...
app.use(cookieParser()); //middleware for parsing cookies

app.use('/', userRouter);
app.use('/', requestRouter);
app.use('/', authRouter);

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database connection failed!!!" + err.message);
    });
