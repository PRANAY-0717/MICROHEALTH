//first we will require path and express
const express = require("express");
const path = require("path");
const fs = require("fs");

//we will require the data 
const data = require("./data.json");

const app = express();
//will set the view engine to ejs
app.set("view engine","ejs");

//set the location of views
app.set("views",path.join(__dirname,"views"));

//to make use of static files
app.use("/",express.static(path.join(__dirname,"public")));

let PORT = 3000;

//now we will make APIs 
app.get("/:serviceName",(req,res)=>{
    console.log("Request Received");
    let {serviceName} = req.params;

    //this changed are made to the file which is prensent in ram not the actual one in haard drive 
    data[serviceName]=Date.now();

    //now make these change permanent or appear in hard drive 
    fs.writeFileSync("./data.json",JSON.stringify(data,null,2));

    res.send("YES");
});

//now we will make apis to send latest beast value 
app.get("/get/:serviceName",(req,res)=>{
    let {serviceName}=req.params;
    res.json(data[serviceName]);
    console.log(`Data Sent for the service ${serviceName}`);
});

//start the server
app.listen(3000,()=>{
    console.log(`Server is running at PORT ${PORT}`);
});