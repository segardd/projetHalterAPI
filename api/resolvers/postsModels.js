const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLScalarType,
    GraphQLInt
} = require('graphql')
 
// Schéma de l'entité "Post"
const ClubType = new GraphQLObjectType({
    name: 'Club',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        director: {type: GraphQLString},
        description: { type: GraphQLString },
        createDate: { type: GraphQLString},
        members: {type: GraphQLList(CompetitorType)}
    },
})
const CompetitorType = new GraphQLObjectType({
    name: 'Competitor',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        firstname: {type: GraphQLString},
        birthday: { type: GraphQLString },
        club: { type: ClubType},
        firstAttempt: {type: GraphQLInt},
        secondAttempt: {type: GraphQLInt},
        thirdAttempt: {type: GraphQLInt}
    },
})

 
module.exports = {
    ClubType, CompetitorType
}