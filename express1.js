var express = require('express');

var app=express();

app.get("/",function(req,res){
    console.log("Logging at express side...");
    res.send ("This is my first script from express...");
})

app.get("/login",function(req,res){
    console.log("Logging at express side...");
    res.send("This is the login script..")
})

app.listen(8000,function(){
    console.log("server is listening at http://localhost:8000");
})