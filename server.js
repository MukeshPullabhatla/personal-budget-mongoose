// const express=require('express');
// const bodyParser = require('body-parser');
// const cors=require('cors');
// const mongoose=require("mongoose");
// const routes=require("./routes");
// const app=express();
// const port =3000;
// var url = "mongodb://localhost:27017/personal_budget";
// var budgetModel=require('./models/budgetData');
// const budget = require("./budget");
// const router = express.Router();
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use('',express.static('public'));
// app.use(cors());


// mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
//         .then(()=>{
//             app.use(express.json())
//             app.use("/api",routes)
//         })
//         .catch((connectionError)=>{
//           console.log(connectionError)
//         })

// app.use(cors());

// app.get('/budget', (req,res)=>{
//     res.json(budget);
// });

// app.listen(port,()=>{
//     console.log(` API Served in this http://localhost:${port}`)
// });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose  = require('mongoose');
const cors = require('cors');
const budgetModel = require('./models/budgetData');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/personal_budget';
app.use('',express.static('public'));
app.use(cors());

app.get('/hello',(req,res)=>{
    res.send("sample text");    
});


app.get('/budget',(req,res)=>{
    
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to the database is established");
                budgetModel.find({})
                           .then((data)=>{
                               console.log(data);
                               res.status(200).send(data);
                               mongoose.connection.close();
                           })
                           .catch((err)=>{
                               console.log(err);
                               res.status(500).send();
                           })
            })
})



app.post('/budget',(req,res)=>{
    console.log("inside post");
    console.log(req.body);
    let data = {id: req.body._id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to the database is established");
                budgetModel.insertMany(data,(err,data)=>{
                    if(err){
                        console.log(err);      
                        res.send(err);
                        mongoose.connection.close();
                    }else{
                        console.log("insert successful"); 
                        res.send(data);    
                        mongoose.disconnect();
                    }                    
                })                              
})
});

app.listen(port,()=>{
    console.log("App is running on port "+port);
});