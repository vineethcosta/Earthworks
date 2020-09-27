const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const outwardSchema = new mongoose.Schema({
    resource:{
        type:ObjectId,
        ref:"Resource"
    },
    quantity :{
        type:ObjectId,
        ref:"Quantity"
    },
    requested_by:{
        type:ObjectId,
        ref:"Person"
    },
    transporter:{
        type:ObjectId,
        ref:"Person"
    },
    location:{
        type:ObjectId,
        ref:"Location"
    },
    comments:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Outward",outwardSchema)