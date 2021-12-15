var express=require("express");
var Sequelize=require("sequelize");
var dbConfig=require("./db.config");
var cors=require("cors");
const bodyparser=require('body-parser');

const app=express();

app.use(cors()); 

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
});

sequelize.authenticate().then(()=>{
    console.log("connection established");
}).catch(err=>{
    console.log("unable to connect"+err);
})

let employee_data=sequelize.define("employeesequelize",{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:Sequelize.STRING,
    dept:Sequelize.STRING,
    designation:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
})

/*
employee_data.sync({force:true}).then(()=>{
    console.log("table created");
}).finally(()=>{
    sequelize.close();
})
*/


app.use(cors());

app.use(express.json());

app.get('/getAllEmployees',(req,res)=>{
    employee_data.findAll({raw:true}).then(data=>{
        console.log(data);
        res.send(data);
    })
})

app.get("/getEmployeeById/:id",function(req,res){
    var id=req.params.id;
    console.log("query id is :"+id);
    employee_data.findByPk(id,{raw:true}).then(data=>{
        console.log(data);
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
})

app.get("/getEmployeeByName/:name",function(req,res){
    var name=req.params.name;
    console.log("query name is :"+name);
    employee_data.findAll({where:{name:name},raw:true}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        console.error(err);
    })
})

app.use(bodyparser.json());
app.post("/insertEmployee",function(req,res) {
    console.log("data");
    var id = req.body.id;
    var name=req.body.name;
    var dept=req.body.dept;
    var designation=req.body.designation;

    var empObj = employee_data.build({id:id,name:name,dept:dept,designation:designation});
    empObj.save().then(data=>{
        var strMsg = "Record inserted successfully...";
        console.log("data");
        res.send(strMsg);
    }).catch ( err=>{
        res.send(err);
    })
});

app.put("/updateEmployee",function(req,res){
    var id = req.body.id;
    var name=req.body.name;
    var dept=req.body.dept;
    var designation=req.body.designation;

    employee_data.update({name:name,dept:dept,designation:designation},{where:{id:id}}).then(data => {
        console.log(data);
        var strMsg = "Record updated successfully";
        res.send(strMsg);
    }).catch(err =>{
        console.error(err);
        res.send(err);
    })
});

app.delete("/deleteemployeebyid/:id",function(req,res){
    console.log("enter employee id");
    var id = req.params.id;
    console.log("Given id is :"+id);

    employee_data.destroy({where : {id:id}}).then( data =>{
        console.log(data);
        var strMsg="Record deleted successfully...";
        res.send(strMsg);
    }).catch(err=>{
        console.error(err);
        res.send(err);
    })
});

app.listen(8000,function(){
    console.log("server is listening at 8000 port");
})
