const developers = require ('../models/developerModel')
const Batches = require ('../models/batchesModel');
// const batchesModel = require('../models/batchesModel');

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

// 4)
const allDevelopers = async function (req,res){
    let getPercentage = req.query.percentage;
    let getProgram = req.query.program;

    getProgramerId = await Batches.find({ program : getProgram}).select({_id: 1});
    
    getSpecificDeveloper = await developers.find(({ $and: [{percentage: {$gte: getPercentage}},{batch: getProgramerId}] })).populate('batch');

    res.send({ data: getSpecificDeveloper, status: true})
}

module.exports.developer = developer
module.exports.eligibleDevelopers= eligibleDevelopers
module.exports.allDevelopers=allDevelopers