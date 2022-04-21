const Batches = require('../models/batchesModel');

const batch = async function(req, res){
  let getBatchData = req.body;

  let showBatchData = await Batches.create(getBatchData);
  res.send({ data: showBatchData , status: true});
};



module.exports.batch = batch;