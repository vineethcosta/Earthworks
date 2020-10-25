const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Person =  mongoose.model("Person")
const Inward =  mongoose.model("Inward")
const Outward =  mongoose.model("Outward")
const Resources =  mongoose.model("Resource")
const EstimatedUnits =  mongoose.model("EstimatedUnits")
const UniversalUnits =  mongoose.model("UniversalUnits")
const Roles =  mongoose.model("Roles")
const Types =  mongoose.model("Types")
const AllSiteLocations =  mongoose.model("AllSiteLocations")
const Organization =  mongoose.model("Organization")


router.post('/addPerson',(req,res)=>{
    console.log("*********** req.body",req.body)
    const {FirstName,LastName,Phone,Email,Organization,CurrentLocation,Address,JobTitle } = req.body 
    //  if(!name || !phone || !email || !organization|| !current_location|| !address){
    //    return  res.status(422).json({error:"Plase add all the fields"})
    //  }
    const person = new Person({
        first_name: FirstName,
        last_name: LastName,
        phone: Phone,
        email:Email,
        organization : Organization,
        current_location: CurrentLocation,
        address: Address,
        role: JobTitle
    })
    console.log(person)
    person.save().then(result=>{
        res.json({person:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addResource',(req,res)=>{
    const {FullName, NickName, SKU, Type, Quantity, Location, Owner} = req.body 
    // if(!type || !measure || !full_name || !nick_name || !now_at ){
    //   return  res.status(422).json({error:"Plase add all the fields"})
    // }
    // console.log("************ req.body = ", req.body );
    const resource = new Resources({
        full_name : FullName, 
        nick_name : NickName, 
        sku : SKU, 
        type : Type, 
        available_quantity : Quantity, 
        location : Location,  
        owner : Owner,
        identifier: FullName + SKU
    })
    resource.save().then(result=>{
        res.json({resource:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addInward',(req,res)=>{
    const {Resource, Person, Organization, Price, Quantity, Comments, Date} = req.body 
    // if(!resource || !quantity || !sourced_by || !comments){
    //   return  res.status(422).json({error:"Plase add all the fields"})
    // }
    const inward = new Inward({
        resource : Resource,
        quantity : Quantity,
        sourced_by : Person,
        comments : Comments,
        organization: Organization,
        price : Price,
        date : Date
    })

    Resources.findOneAndUpdate({identifier : Resource} ,{$inc:{available_quantity: Quantity}}, {new: true} ,(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log("doc", doc);
    })
    .catch(err=>{
        console.log("err",err)
    })

    inward.save().then(result=>{
        res.json({inward:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addOutward', (req,res)=>{
    
    const{Resource, PersonRequested, Transporter, ToLocation, Quantity, Comments} = req.body 
    // if(!resource || !quantity || !requested_by || !comments || transporter || location){
    //   return  res.status(422).json({error:"Plase add all the fields"})
    // }
    const outward = new Outward({
        resource : Resource,
        quantity : Quantity,
        requested_by : PersonRequested,
        transporter : Transporter,
        location : ToLocation,
        comments : Comments
    })
    var quant = 0;
    Resources.findOne({identifier: Resource})
    .then(resource=>{
        console.log("available quant", resource.available_quantity)
        quant = resource.available_quantity })
        .then (x => {
            console.log("quant after", quant);
            if(Quantity <= quant){
                updateResource();
            }else{
                console.log("inside else")
                res.json({"message": "given quantity greater than available quantity"})
            }
        })
        
  
    .catch(err=>{
        console.log(err)
    })
        
   
    const updateResource = () => {Resources.findOneAndUpdate({identifier : Resource},{$inc:{available_quantity: -Quantity}}, {new: true} ,(err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log("doc", doc);
        })
        .catch(err=>{
            console.log("err",err)
        })
    
        outward.save().then(result=>{
            return res.status(200).json({message: 'Successfull'})
        })
        .catch(err=>{
            console.log(err)
    })
    }
})


router.post('/loadDefaultData',(req,res)=>{
    const organizations = [
        {name: "Hyderabad", website: "HYD.com", phone_number:"123456789"},
        {name: "Nellore", website: "NLR.com", phone_number:"123456789"},
        {name: "Bangalore", website: "BNG.com", phone_number:"123456789"},
        {name: "Mumbai", website: "MUM.com", phone_number:"123456789"},
        {name: "Delhi", website: "DEL.com", phone_number:"123456789"},
    ]

    const location = [
        {name: "Hyderabad", abbr: "HYD"},
        {name: "Nellore", abbr: "NLR"},
        {name: 'Bangalore',abbr: 'BNG'},
        {name: 'Mumbai', abbr: 'MUM'},
        {name: 'Delhi', abbr: 'DEL'},
    ]
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

    AllSiteLocations.insertMany(location)
    .then(result=>{
        res.json({locations:result})
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

    Organization.insertMany(organizations)
    .then(result=>{
        res.json({organizations:result})
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