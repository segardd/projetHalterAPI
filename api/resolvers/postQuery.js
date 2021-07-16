const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} = require('graphql')

const { ClubType, CompetitorType } = require('./postsModels')

const queryPostType = new GraphQLObjectType({
    // Nom de l'objet
    name: 'PostQuery',
    // Liste des champs
    fields: {
        // Récupération de tous les posts
        Clubs: {
            type: ClubType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            }
        }
    },
    // Récupération d'un seul post
    Post: {
    }
} 
})