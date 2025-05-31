const express = require('express');
require('dotenv').config();
require('./utils/cronjob');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', authRouter);
app.use('/', userRouter);

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        const Port = process.env.PORT;
        app.listen(Port, '0.0.0.0', () => {
            console.log(`Server is successfully listening on port ${Port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed!!!", err);
    });