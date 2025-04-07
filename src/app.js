const express = require('express');

const app = express();

app.get("/test",(req,res) =>{
    res.send("GETing...");
})

app.post("/test",(req,res) =>{
    res.send("POSTing...")
})

app.patch("/test",(req,res)=>{
    res.send("PATCHing...");
})

app.delete("/test",(req,res)=>{
    res.send("DELETEing...");
})

app.listen(1010);