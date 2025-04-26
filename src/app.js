const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();

const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cors = require('cors');

app.use(express.json()); //middleware for converting json into JS object...
app.use(cookieParser()); //middleware for parsing cookies
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
); //middleware to handle CORS...

app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', authRouter);
app.use('/', userRouter);

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
    })
    .catch((err) => {
        console.log("Database connection failed!!!" + err.message);
    });
