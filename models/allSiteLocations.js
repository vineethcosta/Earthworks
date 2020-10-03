const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const allLocationsSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    abbr :{
        type:String,
        required:true
    },
},{timestamps:true})

mongoose.model("AllSiteLocations",allLocationsSchema)