const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const inwardSchema = new mongoose.Schema({
    resource:{
        type:ObjectId,
        ref:"Resource"
    },
    quantity :{
        type:ObjectId,
        ref:"Quantity"
    },
    sourced_by:{
        type:ObjectId,
        ref:"Person"
    },
    comments:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Inward",inwardSchema)