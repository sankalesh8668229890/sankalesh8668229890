const authormodel = require('../models/authormodel')


let createauthor = async function(req,res){
    try{
        let data = req.body
    let save = await authormodel.create(data)
    res.status(200).send({msg:save})
}catch(error){
    res.status(401).send({msg : error.message})
}
}





module.exports={createauthor}