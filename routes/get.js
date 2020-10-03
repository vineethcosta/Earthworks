const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Inward =  mongoose.model("Inward")
const Outward = mongoose.model("Outward")
const Types = mongoose.model("Types")
const Roles = mongoose.model("Roles")
const Organization = mongoose.model("Organization")
const Location = mongoose.model("AllSiteLocations")


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
    Organization.find()
    .then(orgs=>{
        res.json({orgs})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getAllLocations',(req,res)=>{
    Location.find()
    .then(locations=>{
        res.json({locations})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router