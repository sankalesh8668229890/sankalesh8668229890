const authormodel = require('../models/authormodel')


let createauthor = async function(req,res){
    let data = req.body
    let save = await authormodel.create(data)
    res.status(200).send({msg:save})
}





module.exports={createauthor}