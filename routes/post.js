const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Person =  mongoose.model("Person")
const Inward =  mongoose.model("Inward")
const Outward =  mongoose.model("Outward")
const Resource =  mongoose.model("Resource")
const EstimatedUnits =  mongoose.model("EstimatedUnits")
const UniversalUnits =  mongoose.model("UniversalUnits")
const Roles =  mongoose.model("Roles")
const Types =  mongoose.model("Types")



router.post('/addPerson',(req,res)=>{
    const {name,phone,email,organization,current_location,address } = req.body 
    if(!name || !phone || !email || !organization|| !current_location|| !address){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    const person = new Person({
        name,
        phone,
        email,
        organization,
        current_location,
        address
    })
    person.save().then(result=>{
        res.json({person:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addResource',(req,res)=>{
    const {type,measure,full_name,nick_name,now_at } = req.body 
    if(!type || !measure || !full_name || !nick_name || !now_at ){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    const resource = new Resource({
        type,
        measure,
        full_name,
        nick_name,
        now_at
    })
    resource.save().then(result=>{
        res.json({resource:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addInward',(req,res)=>{
    const {resource,quantity,sourced_by,comments } = req.body 
    if(!resource || !quantity || !sourced_by || !comments){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    const inward = new Inward({
        resource,
        quantity,
        sourced_by,
        comments
    })
    inward.save().then(result=>{
        res.json({inward:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addOutward',(req,res)=>{
    const {resource,quantity,requested_by,transporter,location,comments } = req.body 
    if(!resource || !quantity || !requested_by || !comments || transporter || location){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    const outward = new Outward({
        resource,
        quantity,
        requested_by,
        transporter,
        location,
        comments
    })
    outward.save().then(result=>{
        res.json({outward:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/loadDefaultData',(req,res)=>{
    const universalUnits = [
        {name: "meters", abbr: "m"},
        {name: "square-meters", abbr: "sq.m"},
        {name: 'cubic-meters',abbr: 'cu.m'},
        {name: 'centimeters', abbr: 'cm'},
        {name: 'square-centimeters', abbr: 'sq.cm'},
        {name: 'cubic-centimeters', abbr: 'cu.cm'},
        {name: 'millimeters', abbr: 'mm'},
        {name: 'square-millimeters', abbr: 'sq.mm'},
        {name: 'cubic-millimeters', abbr: 'cu.mm'},
        {name: 'inches', abbr: 'in'},
        {name: 'square-inches', abbr: 'sq.in'},
        {name: 'cubic-inches', abbr: 'cu.in'},
        {name: 'grams', abbr: 'gm'},
        {name: 'kilograms', abbr: 'kg'},
        {name: 'tonnes', abbr: 'tonnes'},
        {name: 'litres', abbr: 'l'},
        {name: 'millilitres', abbr: 'ml'}
    ]

    const estimatedUnits = [
        {name: "BAGS", abbr: "BAGS"},
        {name: "LOADS", abbr: "TRIPS"},
        {name: "CYLINDERS",abbr: "CYLINDERS"}
    ]

    const roles = [
        {role: "SUPER ADMIN"},
        {role: "ORG ADMIN"},
        {role: "ENGINEER"},
        {role: "INVERNTORY"},
    ]

    const types=[
        {name:"TOOL"},
        {name:"CONSUMABLE"},
        {name:"RAW_MATERIAL"},
        {name:"MACHINE"},
        {name:"VEHICLE"},
        {name:"PEOPLE"}
    ]
    Types.insertMany(types)
    .then(result=>{
        res.json({types:result})
    })
    .catch(err=>{
        console.log(err)
    })

    Roles.insertMany(roles)
    .then(result=>{
        res.json({roles:result})
    })
    .catch(err=>{
        console.log(err)
    })

  
    
    EstimatedUnits.insertMany(estimatedUnits)
    .then(result=>{
        res.json({estimatedUnits:result})
    })
    .catch(err=>{
        console.log(err)
    })

    UniversalUnits.insertMany(universalUnits)
    .then(result=>{
        res.json({universalUnits:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router