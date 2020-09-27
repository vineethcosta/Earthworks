const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Inward =  mongoose.model("Inward")
const Outward = mongoose.model("Outward")
const Types = mongoose.model("Types")
const Roles = mongoose.model("Roles")
const Organizations = mongoose.model("Organizations")
router.get('/getInward',(req,res)=>{
    Inward.find()
    .sort('-createdAt')
    .then(inward=>{
        res.json({inward})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getOutward',(req,res)=>{
    Outward.find()
    .sort('-createdAt')
    .then(outward=>{
        res.json({outward})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getTypes',(req,res)=>{
    Types.find()
    .sort('-createdAt')
    .then(types=>{
        res.json({types})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getRoles',(req,res)=>{
    Roles.find()
    .then(roles=>{
        res.json({roles})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getOrganizations',(req,res)=>{
    Organizations.find()
    .then(orgs=>{
        res.json({orgs})
    })
    .catch(err=>{
        console.log(err)
    })
})


