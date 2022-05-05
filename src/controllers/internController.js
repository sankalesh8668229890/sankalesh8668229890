
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
//######################################################################################################################
let keyValid = function (value) {
    if (typeof (value) == "undefined") { return true }
    if (typeof (value) === "string" && value.trim().length == 0) { return true }
    return false
}

//######################################################################################################################
let createIntern = async function (req, res)  {
    try {
       let data = req.body
       const {name,mobile,email,collegeId}=data
       let regex = /^[a-zA-Z ]{2,30}$/ 
       let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
       let mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

    if(!name)return res.status(400).send({status :false , Message:" PLEASE ENTER NAME"})
    if (keyValid(name)) return res.status(400).send({ status: false, Message: "Name should be valid" }) 
    if(!name.match(regex))return res.status(400).send({status: false, Message: "FIRSTNAME SHOULD ONLY CONATIN ALPHABATS AND LENTH MUST BE IN BETWEEN 2-30"})

    if(!mobile)return res.status(400).send({status :false , Message:" PLEASE ENTER MOBILE NO"})
    if(!mobile.match(mobileRegex))return res.status(400).send({status: false, Message: "Please enter valid mobile"})

    if(!email)return res.status(400).send({status :false , Message:" PLEASE ENTER EMAIL"})
    if(!email.match(emailRegex))return res.status(400).send({status: false, Message: "Please enter valid email"})

    if(!collegeId)return res.status(400).send({status :false , Message:" PLEASE ENTER COLLEGE ID"})
  
    let duplicate = await internModel.findOne({$or:[{email:email},{mobile:mobile}]})
    if(duplicate){
        return res.status(400).send({status:false, Message:"Email or Mobile Number already exist"})
    }
       let newIntern = await internModel.create(data);
       res.status(201).send({status:true,Message:"Data saved sucessfully", data:newIntern})

    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################

module.exports = { createIntern }



