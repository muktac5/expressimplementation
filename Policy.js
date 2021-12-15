var express=require('express');
var Sequelize=require('sequelize');
var dbConfig=require('./db.Config');
const app=express();
app.use(express.json())

var sequelize= new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool:{
        min:dbConfig.pool.min,
        max:dbConfig.pool.max,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
    
});

sequelize.authenticate().then( () =>{
    console.log("Connected to database successfully..");
}).catch (err => {
    console.error("Unable to connect to db,because"+err);
})

let insuranceTable=sequelize.define('InsuranceSequelize',{
    policyno:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    pname:Sequelize.STRING,
    policyamt:Sequelize.INTEGER,
    maturityamt:Sequelize.INTEGER,
    nominee:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
});
/*
insuranceTable.sync({force:true}).then(()=>{
    console.log("Table created successfully")
}).catch (err => {
    console.error("Error"+err);
});
*/
app.get("/",function(req,res){
    console.log("At get of http://localhost:8002");
    res.send("Hellooo");

app.get('/getAllPolicies',function(req,res){
    insuranceTable.findAll({raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data)
    }).catch(err=>{
        console.error("There is an error getting data from db: "+err );
        res.status(400).send(err);
    })
    })
})
  
app.get('/getAllPolicies/:policyno',function(req,res){
         policyno=req.params.policyno;
        console.log("Given id: "+policyno)
       insuranceTable.findByPk(policyno,{raw:true}).then(data=>{
        console.log(data);
        res.status(200).send(data)
       }).catch(err=>{
        console.error("There is an error getting data from db: "+err );
        res.status(400).send(err);
    })
        })
    
    app.post('/insertData',function(req,res){
        pol=req.body.policyno,
        pname=req.body.pname,
        policyamt=req.body.policyamt,
        maturityamt=req.body.maturityamt,
        nominee=req.body.nominee
    var policyObj=insuranceTable.build({policyno:pol,pname:pname,policyamt:policyamt,maturityamt:maturityamt,nominee:nominee});
    policyObj.save().then(data=>{
        var Msg="Record Inserted Successfully";
        res.status(200).send(data)
       }).catch(err=>{
        console.error("There is an error getting data from db: "+err );
        res.status(400).send(err);
    })
    })
    app.put('/updateData',function(req,res){
        pol=req.body.policyno,
        pname=req.body.pname,
        policyamt=req.body.policyamt,
        maturityamt=req.body.maturityamt,
        nominee=req.body.nominee
        insuranceTable.update({policyno:pol,pname:pname,policyamt:policyamt,maturityamt:maturityamt,nominee:nominee},{where:{policyno:pol}})
        .then(data=>{
            console.log(data)
            var Msg="Record Updated Successfully";
            res.status(200).send(Msg)
           }).catch(err=>{
            console.error("There is an error getting data from db: "+err );
            res.status(400).send(err);
        })
        })
        app.delete('/deleteDataById/:id',function(req,res){
             pol=req.params.id;
           
            insuranceTable.destroy({where:{policyno:pol}})
            .then(data=>{
                console.log(data)
                var Msg="Record Deleted Successfully";
                res.status(200).send(Msg)
               }).catch(err=>{
                console.error("There is an error getting data from db: "+err );
                res.status(400).send(err);
            })
            })

app.listen(8002,function(){
    console.log("Server is listening at http://localhost:8002");
    })
    