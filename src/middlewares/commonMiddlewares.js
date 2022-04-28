const req = require("express/lib/request")
const authormodel=require('../models/authormodel')
const Blogmodel = require('../models/Blogmodel')
const mongoose = require('mongoose')
const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId)
 const jwt=require('jsonwebtoken')


const auth1 = async function (req,res,next){
    let data = req.query

    if (!isValidObjectId(data.authorId)) { return res.status(400).send({ status: false, msg: "NOT A VALID AUTHOR ID" }) }
    if (!data.authorId) { return res.status(400).send({ status: false, msg: "KINDLY ADD AUTHOR ID" }) }
    let token = req.headers["x-auth-token"]
    if (!token) { return res.status(400).send({ status: false, msg: "KINDLY ADD TOKEN" }) }
    let decodedtoken = jwt.verify(token, "KANISHK-MAKKAR")
    if (decodedtoken.authorId != data.authorId) { return res.status(403).send({ status: false, msg: "NOT AUTHORISED" }) }
    next()
}


const auth2= async function(req,res,next){
    let blogId = req.params.blogId
let get = await Blogmodel.findById(blogId).select({authorId:1,_id:0})
console.log(get)
    let token = req.headers["x-auth-token"]
    if (!token) { return res.status(400).send({ status: false, msg: "KINDLY ADD TOKEN" }) }
    let decodedtoken = jwt.verify(token, "KANISHK-MAKKAR")
    if (decodedtoken.authorId !=get.authorId) { return res.status(403).send({ status: false, msg: "NOT AUTHORISED" }) }
    next()
}
module.exports = {auth1,auth2}



