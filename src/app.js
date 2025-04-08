const express = require('express');

const app = express();

app.use("/user", (req,res,next)=>{
    console.log("1st Respond...");
    next();
})

app.use("/user",(req,res,next)=>{
    console.log("2nd Respond...");
    next();
})

app.use("/user", (req,res,next)=>{
    console.log("3rd Respond...");
    next();
})

app.use("/user", (req,res,next)=>{
    console.log("4th Respond...");
    next();
})

app.use("/user", (req,res)=>{
    console.log("5th Respond...");
    res.send("5th response...");
})

app.listen(1010);