const express = require('express');

const app = express();

app.use('/Documents', (req,res) => {
    res.send("This is the Document Page!!");
})

app.use("/Locker",(req,res) => {
    res.send("This is the Shocker");
})

app.use("/",(req,res) => {
    res.send("Hello everyone!! This is Raj");
})

app.listen(1010);