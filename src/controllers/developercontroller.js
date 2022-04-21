const developers = require ('../models/developerModel')
const Batches = require ('../models/batchesModel')

const developer = async function(req,res){
    let getdeveloperData = req.body

    let developerData = await developers.create(getdeveloperData)
    res.send ({ data: developerData, status:true})

};

// 3)
const eligibleDevelopers = async function(req,res){
    let getEligibleDevelopers = await developers.find({$and: [{gender : "female"}, {percentage: {$gte:70}}]}).populate('batch');
    res.send({data:getEligibleDevelopers})
}



module.exports.developer = developer
module.exports.eligibleDevelopers= eligibleDevelopers