var express=require('express');
var app=express();
app.use(express.json());

app.post('/totalsalary',(req,res)=>{
    var basic = req.body.basic;
    var hra=req.body.hra;
    var da=req.body.da;
    var it=req.body.it;
    var pf=req.body.pf;

    res.send({'Total In hand salary ': basic+hra+da-(it+pf)});
})

app.listen(8000,()=>{
    console.log("Service is running...");
})