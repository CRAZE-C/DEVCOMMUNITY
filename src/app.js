const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('./middleware/auth');

app.use("/admin", adminAuth);

app.use("/user/patchData", userAuth, (req,res)=>{
    res.send("Successfully patched...");
})

app.get("/admin/getData",(req,res)=>{
    res.send("Data received successfully...");
})

app.get("/admin/update",(req,res)=>{
    res.send("Profile updated successfully...");
})

app.listen(1010);