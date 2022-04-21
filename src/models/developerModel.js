const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId

const developerSchema = new mongoose.Schema({
    name : String,

    gender : { 
        type : String,
        enum : ["male","female","other"]
    },

    percentage : Number,

    batch : {
        type : ObjectId,
        ref : "Batches"
    },
}, {timestamps : true});

module.exports = mongoose.model('Developer',developerSchema)