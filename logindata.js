var express=require ("express");
var app=express();

app.get("/login",function(req,res){
    console.log("At login of server side");

    var uid=req.query.uid;
    var pwd=req.query.password;

    console.log(`Given data for User ID ${uid} pwd: ${pwd}`);

    var strToReturn="You are not a valid user";

    if(uid=='Mukta' && pwd=="admin"){
        strToReturn="You are a valid user";
    }

    res.send(strToReturn);
})

app.listen(8000,function(){
    console.log("server is listening");
})