const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const resourceSchema = new mongoose.Schema({
    identifier:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    comment :{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    nick_name:{
        type:String,
        required:true
    },
    owner:{
        type:ObjectId,
        ref:"Person"
    },
    available_quantity:{
        type:ObjectId,
        ref:"Quantity"
    },
    sku:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

},{timestamps:true})

mongoose.model("Resource",resourceSchema)