const express = require('express');
const {connectDB} = require('./config/database');
const app = express();

connectDB()
    .then(() => {
        console.log("Database connection is established...");
        app.listen(1010, console.log("Server is successfully listening on port 1010"));
        
    })
    .catch((err) => {
        console.log("Database is failed to connect!!!");
    });
