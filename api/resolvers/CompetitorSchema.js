mongoose = require('mongoose');
var composeMongoose = require('graphql-compose-mongoose');
var schemaComposer = require('graphql-compose');
var UniqueValidator = require('mongoose-unique-validator');


const CompetitorSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    sex: {
        type: String,
        enum: {
            values:['M','F'],
            message: '{Value} is not supported'
        }
    },
    name: { 
        type: String
    },
    firstname : {type: String},
    birthday : {type: Date},
    weight: {
        type: Number
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    
    firstAttempt: {type: Number},
    secondAttempt: {type: Number},
    thirdAttempt: {type: Number}
})

module.exports = CompetitorSchema;

