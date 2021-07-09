mongoose = require('mongoose');
var composeMongoose = require('graphql-compose-mongoose');
var schemaComposer = require('graphql-compose');
var UniqueValidator = require('mongoose-unique-validator');
var CompetitorSchema = require('./ClubSchema');

const ClubSchema = new mongoose.Schema({
    name: { 
        type: String
    },
    director : {type: String},
    description : {type: String},
    createDate : {type: String},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competitor"
        }]
})

module.exports = ClubSchema;