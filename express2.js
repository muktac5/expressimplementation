const express= require('express');
const app=express();
const employee=[
    {id:1,name:"mukta",department:"full stack",designation:"consultant trainee"},
    {id:2,name:"laasya",department:"salesforce",designation:"consultant"},
    {id:3,name:"sahitya",department:"quality assurance",designation:"senior consultant"},
    {id:4,name:"deepshika",department:"ui/ux",designation:"consultant trainee"}
]

app.get('/getAllEmployeeData',(req,res)=>{
    console.log("EmployeeObject");
    res.send(employee);
})

app.listen(8000,function(){
    console.log("server is running");
})