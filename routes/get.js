const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Inward =  mongoose.model("Inward")
const Outward = mongoose.model("Outward")
const Types = mongoose.model("Types")
const Roles = mongoose.model("Roles")
const Organization = mongoose.model("Organization")
const Location = mongoose.model("AllSiteLocations")
const Person =  mongoose.model("Person")
const Resource = mongoose.model("Resource")

router.get('/getOwners',(req,res)=>{
    //  Person.find(x=>x.role=='owner')
    // .sort('-createdAt')
    // .then(owner=>{
    //     res.json({owner})
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    res.json({});
})

router.get('/getAllPersons',(req,res)=>{
    Person.find({}, 
    {
        "first_name": 1,
        "last_name" : 1
    })
    .then(persons=>{
        res.json({persons})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/getInward',(req,res)=>{
    console.log("Inside getInward");
    Inward.find({}, {_id : 0, createdAt: 0, updatedAt:0, __v : 0})
    .sort('-createdAt')
    .then(inward=>{
        res.json({inward})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getOutward',(req,res)=>{
    Outward.find({}, {_id : 0, createdAt: 0, updatedAt:0, __v : 0})
    .sort('-createdAt')
    .then(outward=>{
        res.json({outward})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getTypes',(req,res)=>{
    console.log("inside getTypes")
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

router.get('/getAllResources',(req,res)=>{
    Resource.find({}, 
    {
        "identifier": 1
    })
    .then(resources=>{
        res.json({resources})
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports = router
