const mongoose=require("mongoose");
const BudgetSchema=new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique:true
        },
        cost:{
            type:Number,
            required:true
        },
        color:{
            type:String,
            required:true,
            validate: [isValid, 'Please enter color in Hexadecimal']
            
        }
},{collection: 'myBudget'})

function isValid(s){
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s)
}

module.exports=mongoose.model('myBudget',BudgetSchema)