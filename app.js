const express = require('express')
const app = express()
var cors = require('cors');
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

app.use(cors);
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/location')
require('./models/organization')
require('./models/person')
require('./models/price')
require('./models/quantity')
require('./models/resource')
require('./models/inward')
require('./models/outward')
require('./models/roles')
require('./models/estimatedUnits')
require('./models/universalUnits')
require('./models/types')
app.use(express.json())
app.use(require('./routes/post'))
app.use(require('./routes/get'))

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})