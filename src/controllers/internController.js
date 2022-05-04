
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
//######################################################################################################################

let createIntern = async function (req, res)  {
    try {
       let data = req.body
       let regex = /^[a-zA-Z ]{2,30}$/
       let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
       let mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

    // validation for null inputs
    if(!data.name)return res.status(400).send({status :false , msg:" PLEASE ENTER NAME"})
    if(!data.mobile)return res.status(400).send({status :false , msg:" PLEASE ENTER MOBILE NO"})
    if(!data.email)return res.status(400).send({status :false , msg:" PLEASE ENTER EMAIL"})
    if(!data.collegeId)return res.status(400).send({status :false , msg:" PLEASE ENTER COLLEGE ID"})

    // regex validation
    if(!data.name.match(regex))return res.status(400).send({status: false, msg: "FIRSTNAME SHOULD ONLY CONATIN ALPHABATS AND LENTH MUST BE IN BETWEEN 2-30"})
    if(!data.email.match(emailRegex))return res.status(400).send({status: false, msg: "Please enter valid email"})
    if(!data.mobile.match(mobileRegex))return res.status(400).send({status: false, msg: "Please enter valid mobile"})

    let duplicate = await internModel.findOne({$or:[{email:data.email},{mobile:data.mobile}]})
    if(duplicate){
        return res.status(400).send({status:false, msg:"Email or Mobile Number already exist"})
    }
       let newIntern = await internModel.create(data);
       res.status(201).send({status:true,msg:"Data saved sucessfully", data:newIntern})

    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################

module.exports = { createIntern }



