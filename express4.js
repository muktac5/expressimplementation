const express= require('express')
const app=express();
app.use(express.json());
const employee=[
    {id:1,name:"mukta",department:"full stack",designation:"consultant trainee"},
    {id:2,name:"laasya",department:"salesforce",designation:"consultant"},
    {id:3,name:"sahitya",department:"quality assurance",designation:"senior consultant"},
    {id:4,name:"deepshika",department:"ui/ux",designation:"consultant trainee"},
    {id:5,name:"shagufta",department:"salesforce",designation:"consultant trainee"}
]

app.get('/getAllEmployeeData',(req,res)=>{
    console.log("Sending array of onject");
    res.send(employee);
})

app.get('/getemployeebyid/:id',(req,res)=>{
    var id=req.params.id;
    let idrecord={};
    employee.forEach((i)=>{
        if(i.id==id)
        {
            idrecord=i;
        }
    })
    res.send(idrecord);
})

app.get('/getemployeebyname/:name',(req,res)=>{
    var name=req.params.name;
    let namerecord={};
    employee.forEach((i)=>{
        if(i.name==name)
        {
            namerecord=i;
        }
    })
    res.send(namerecord);
})

app.put('/updateemployeedata/:id',(req,res)=>{
    tempid=req.body.id;
    tempname=req.body.name;
    tempdept=req.body.department;
    tempdesgn=req.body.designation;
    for (let i=0;i<employee.length;i++){
        if(employee[i].id==tempid){
            employee[i].id=tempid;
            employee[i].name=tempname;
            employee[i].department=tempdept;
            employee[i].designation=tempdesgn;
        }
        res.send("Updated successfully");
    }
})

app.delete('/deleterecord/:id',(req,res)=>{
    var qid=req.params.id;
    var flag=-1;
    for(let i=0;i<employee.length;i++)
    {
        if(employee[i].id==qid){
            flag=i;
            break;
        }
    }
    if(flag==-1){
        res.send("Record not present");
    }
    else{
        employee.splice(flag,1);
        res.send("Deleted successfully");
    }
})

app.post('/insertEmployeeData',(req,res)=>{
    employee.push(req.body);
    res.send("Inserted Successfully");
})
app.listen(8000,function(){
    console.log("Server is running");
})