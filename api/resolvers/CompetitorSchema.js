mongoose = require('mongoose');
var composeMongoose = require('graphql-compose-mongoose');
var schemaComposer = require('graphql-compose');
var UniqueValidator = require('mongoose-unique-validator');


const CompetitorSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    name: { 
        type: String
    },
    firstname : {type: String},
    birthday : {type: Date},
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    firstAttempt: {type: Number},
    secondAttempt: {type: Number},
    thirdAttempt: {type: Number}
})

module.exports = CompetitorSchema;

