const authormodel=require('../models/authormodel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


const login = async function (req, res) {
  let email = req.body.email
  let password = req.body.password
  

  let get = await authormodel.findOne({email:email})
  if (!get){return res.status(400).send({status:false,msg:"YOUR EMAIL OR PASSWORD IS INCORRECT"})}
  console.log(password,get.password);
  let isMatch = await bcrypt.compare(password,get.password);
  console.log(isMatch);
        if (isMatch){return res.status(200).send("YOU ARE SUCCESFULLY LOGGED IN")}


  let token = jwt.sign({authorId:get._id.toString()},"KANISHK-MAKKAR")
  res.setHeader("x-auth-token",token)
  res.status(200).send({status:true,msg:"YOU ARE SUCCESFULLY LOGGED IN"})
}
module.exports.login=login