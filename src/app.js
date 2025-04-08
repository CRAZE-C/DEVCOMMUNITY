const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('./middleware/auth');

app.use("/admin", adminAuth);

app.use("/user/patchData", userAuth, (req, res) => {
    try{
        throw new Error();
        res.send("Successfully patched...");
    }
    catch{
        res.status(500).send("Something went wrong...");
    }
    //try catch block is used to handle the error and send the response to the client...
})


app.use("/",(err,req,res,next)=>{
    if(err)
        res.status(501).send("Something Went Wrong...");
}) // Graceful method for ERROR handling... 
   // But the best way is to use try catch block in the route handler...

app.get("/admin/getData", (req, res) => {
    res.send("Data received successfully...");
})

app.get("/admin/update", (req, res) => {
    res.send("Profile updated successfully...");
})

app.listen(1010);