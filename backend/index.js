const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
//app.use('/api/auth', require('./Routes/auth'));
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrderData"));
app.get("/", (req,res)=>{
    res.send("Hello World");
});

app.listen(port, ()=>{
    console.log(`Listening on port no ${port}`);
});
