const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const resourceSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    measure :{
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
    now_at:{
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
    SKU:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    }

},{timestamps:true})

mongoose.model("Resource",resourceSchema)