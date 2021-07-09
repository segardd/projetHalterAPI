var mongoose = require( 'mongoose');
var {composeMongoose} = require( 'graphql-compose-mongoose');
var {schemaComposer} = require( 'graphql-compose');
var UniqueValidator = require( 'mongoose-unique-validator');
var ClubSchema = require( './ClubSchema');
var CompetitorSchema = require( './CompetitorSchema');

const Competitor = mongoose.model('Competitor',CompetitorSchema);
const Club = mongoose.model('Club',ClubSchema);
const customizationsOptions = {};
//const CompetitorTC = composeMongoose(Competitor, customizationOptions);
const ClubTC = composeMongoose(Club);
const CompetitorTC = composeMongoose(Competitor);

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

schemaComposer.Query.addFields({
    ClubById: ClubTC.mongooseResolvers.findById(),
    ClubByIds: ClubTC.mongooseResolvers.findByIds(),
    ClubOne: ClubTC.mongooseResolvers.findOne(),
    ClubMany: ClubTC.mongooseResolvers.findMany(),
    ClubDataLoader: ClubTC.mongooseResolvers.dataLoader(),
    ClubDataLoaderMany: ClubTC.mongooseResolvers.dataLoaderMany(),
    ClubByIdLean: ClubTC.mongooseResolvers.findById({ lean: true }),
    ClubByIdsLean: ClubTC.mongooseResolvers.findByIds({ lean: true }),
    ClubOneLean: ClubTC.mongooseResolvers.findOne({ lean: true }),
    ClubManyLean: ClubTC.mongooseResolvers.findMany({ lean: true }),
    ClubDataLoaderLean: ClubTC.mongooseResolvers.dataLoader({ lean: true }),
    ClubDataLoaderManyLean: ClubTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    ClubCount: ClubTC.mongooseResolvers.count(),
    ClubConnection: ClubTC.mongooseResolvers.connection(),
    ClubPagination: ClubTC.mongooseResolvers.pagination(),
  });

  schemaComposer.Query.addFields({
    CompetitorById: CompetitorTC.mongooseResolvers.findById(),
    CompetitorByIds: CompetitorTC.mongooseResolvers.findByIds(),
    CompetitorOne: CompetitorTC.mongooseResolvers.findOne(),
    CompetitorMany: CompetitorTC.mongooseResolvers.findMany(),
    CompetitorDataLoader: CompetitorTC.mongooseResolvers.dataLoader(),
    CompetitorDataLoaderMany: CompetitorTC.mongooseResolvers.dataLoaderMany(),
    CompetitorByIdLean: CompetitorTC.mongooseResolvers.findById({ lean: true }),
    CompetitorByIdsLean: CompetitorTC.mongooseResolvers.findByIds({ lean: true }),
    CompetitorOneLean: CompetitorTC.mongooseResolvers.findOne({ lean: true }),
    CompetitorManyLean: CompetitorTC.mongooseResolvers.findMany({ lean: true }),
    CompetitorDataLoaderLean: CompetitorTC.mongooseResolvers.dataLoader({ lean: true }),
    CompetitorDataLoaderManyLean: CompetitorTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    CompetitorCount: CompetitorTC.mongooseResolvers.count(),
    CompetitorConnection: CompetitorTC.mongooseResolvers.connection(),
    CompetitorPagination: CompetitorTC.mongooseResolvers.pagination(),
  });
  
  schemaComposer.Mutation.addFields({
    ClubCreateOne: ClubTC.mongooseResolvers.createOne(),
    ClubCreateMany: ClubTC.mongooseResolvers.createMany(),
    ClubUpdateById: ClubTC.mongooseResolvers.updateById(),
    ClubUpdateOne: ClubTC.mongooseResolvers.updateOne(),
    ClubUpdateMany: ClubTC.mongooseResolvers.updateMany(),
    ClubRemoveById: ClubTC.mongooseResolvers.removeById(),
    ClubRemoveOne: ClubTC.mongooseResolvers.removeOne(),
    ClubRemoveMany: ClubTC.mongooseResolvers.removeMany(),
  });

  schemaComposer.Mutation.addFields({
    CompetitorCreateOne: CompetitorTC.mongooseResolvers.createOne(),
    CompetitorCreateMany: CompetitorTC.mongooseResolvers.createMany(),
    CompetitorUpdateById: CompetitorTC.mongooseResolvers.updateById(),
    CompetitorUpdateOne: CompetitorTC.mongooseResolvers.updateOne(),
    CompetitorUpdateMany: CompetitorTC.mongooseResolvers.updateMany(),
    CompetitorRemoveById: CompetitorTC.mongooseResolvers.removeById(),
    CompetitorRemoveOne: CompetitorTC.mongooseResolvers.removeOne(),
    CompetitorRemoveMany: CompetitorTC.mongooseResolvers.removeMany(),
  });

const schema = schemaComposer.buildSchema();
module.exports = schema;