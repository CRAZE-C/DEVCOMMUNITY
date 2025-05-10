const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();

const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cors = require('cors');

app.use(express.json({ limit: '1mb' })); //middleware for converting json into JS object...
app.use(cookieParser()); //middleware for parsing cookies
app.use(
    cors({
        origin: ["http://localhost:5173", "https://66wf1vgr-5173.inc1.devtunnels.ms"],
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
        app.listen(7777, '0.0.0.0', () => {
            console.log("Server is successfully listening on port 7777");
        });

    })
    .catch((err) => {
        console.log("Database connection failed!!!");
    });
