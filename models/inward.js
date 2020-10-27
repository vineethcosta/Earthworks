const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const inwardSchema = new mongoose.Schema({
    resource:{
        type:String,
        // ref:"Resource"
    },
    quantity :{
        type: Number
        // type:ObjectId,
        // ref:"Quantity"
    },
    sourced_by:{
        type: String
        // ref:"Person"
    },
    price:{
        type:Number,
        // required: true
    },
    date:{
        type:String,
        // required:true
    },
    organization:{
        type:String,
        // required:true
    },
    comments:{
        type:String,
        // required:true
    },
    type:{
        type:String,
        default:"Inward"
    }
},{timestamps:true})

mongoose.model("Inward",inwardSchema)