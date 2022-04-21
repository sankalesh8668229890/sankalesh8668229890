const mongoose = require('mongoose');
// let ObjectId = mongoose.Schema.Types.ObjectId //in this objectId is not needed because we refer student(developer) to batches.

const batchSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    size : Number,

    program : {
        type : String,
        required : ["frontend","backend"]
    },

}, {timestamps : true});

module.exports = mongoose.model('Batch',batchSchema)