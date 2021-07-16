var mongoose = require( 'mongoose');
var {composeMongoose} = require( 'graphql-compose-mongoose');
var {schemaComposer} = require( 'graphql-compose');
var UniqueValidator = require( 'mongoose-unique-validator');
var ClubSchema = require( './ClubSchema');
var CompetitorSchema = require( './CompetitorSchema');
var CompetitionSchema = require('./CompetitionSchema');

const Competitor = mongoose.model('Competitor',CompetitorSchema);
const Club = mongoose.model('Club',ClubSchema);
const Competition = mongoose.model('Competition',CompetitionSchema);
const customizationsOptions = {};
//const CompetitorTC = composeMongoose(Competitor, customizationOptions);
const ClubTC = composeMongoose(Club);
const CompetitorTC = composeMongoose(Competitor);
const CompetitionTC = composeMongoose(Competition);


ClubTC.addRelation("membersDetails",{
    resolver: ()=>CompetitorTC.mongooseResolvers.findByIds(),
    prepareArgs: {
        _ids: (source) => source.members,
    },
    projection: 
    {
        id: 1,
        name: 1,
        firstname:1,
        birthday: 1,
        club: 1,
        firstAttempt: 1,
        secondAttempt: 1,
        secondAttempt: 1,

    }
})

CompetitorTC.addRelation("clubInfo",{
    resolver: ()=>ClubTC.mongooseResolvers.findById(),
    prepareArgs: {
        _id: (source) => source.club,
    },
    projection: {_id: 1,name: 1, director:1, createDate: 1, description: 1, members: 1}
})


var ObjectToGraphList = {'Club': ClubTC, 'Competitor': CompetitorTC,'Competition': CompetitionTC};
console.log('LISTname: '+ObjectToGraphList[0])
for (var key in ObjectToGraphList){
  console.log('TAMER'+key)
  schemaComposer.Query.addFields({
    [`${key}ById`]: ObjectToGraphList[key].mongooseResolvers.findById(),
    [`${key}ByIds`]: ObjectToGraphList[key].mongooseResolvers.findByIds(),
    [`${key}One`]: ObjectToGraphList[key].mongooseResolvers.findOne(),
    [`${key}Many`]: ObjectToGraphList[key].mongooseResolvers.findMany(),
    [`${key}DataLoader`]: ObjectToGraphList[key].mongooseResolvers.dataLoader(),
    [`${key}DataLoaderMany`]: ObjectToGraphList[key].mongooseResolvers.dataLoaderMany(),
    [`${key}ByIdLean`]: ObjectToGraphList[key].mongooseResolvers.findById({ lean: true }),
    [`${key}ByIdsLean`]: ObjectToGraphList[key].mongooseResolvers.findByIds({ lean: true }),
    [`${key}OneLean`]: ObjectToGraphList[key].mongooseResolvers.findOne({ lean: true }),
    [`${key}ManyLean`]: ObjectToGraphList[key].mongooseResolvers.findMany({ lean: true }),
    [`${key}DataLoaderLean`]: ObjectToGraphList[key].mongooseResolvers.dataLoader({ lean: true }),
    [`${key}DataLoaderManyLean`]: ObjectToGraphList[key].mongooseResolvers.dataLoaderMany({ lean: true }),
    [`${key}Count`]: ObjectToGraphList[key].mongooseResolvers.count(),
    [`${key}Connection`]: ObjectToGraphList[key].mongooseResolvers.connection(),
    [`${key}Pagination`]: ObjectToGraphList[key].mongooseResolvers.pagination(),
  });

  schemaComposer.Mutation.addFields({
    [`${key}CreateOne`]: ObjectToGraphList[key].mongooseResolvers.createOne(),
    [`${key}CreateMany`]: ObjectToGraphList[key].mongooseResolvers.createMany(),
    [`${key}UpdateById`]: ObjectToGraphList[key].mongooseResolvers.updateById(),
    [`${key}UpdateOne`]: ObjectToGraphList[key].mongooseResolvers.updateOne(),
    [`${key}UpdateMany`]: ObjectToGraphList[key].mongooseResolvers.updateMany(),
    [`${key}RemoveById`]: ObjectToGraphList[key].mongooseResolvers.removeById(),
    [`${key}RemoveOne`]: ObjectToGraphList[key].mongooseResolvers.removeOne(),
    [`${key}RemoveMany`]: ObjectToGraphList[key].mongooseResolvers.removeMany(),
  });
}

const schema = schemaComposer.buildSchema();
module.exports = schema;