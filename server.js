const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");
const routes=require("./routes");
const app=express();
const port =3000;
var url = "mongodb://localhost:27017/personal_budget";
var budgetModel=require('./models/budgetData');
const budget = require("./budget");
const router = express.Router()


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            app.use(express.json())
            app.use("/api",routes)
        })
        .catch((connectionError)=>{
          console.log(connectionError)
        })

app.use(cors());

app.get('/budget', (req,res)=>{
    res.json(budget);
});

app.listen(port,()=>{
    console.log(` API Served in this http://localhost:${port}`)
});