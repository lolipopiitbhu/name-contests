// Import type helpers from graphql-js
const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const pgdb =require('../database/pgdb');
const MeType = require('./types/me')

// the RootQueryType
const RootQueryType = new GraphQLObjectType({
    name: "RootQuerryType",

    fields: {
        hello:{
            type: GraphQLString,
            description: 'The *mandatory* "hello world" example',
            resolve: () => "world"
        },
        me: {
            type: MeType,
            description:'current user identified by api key',
            args:{
                key: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (obj, args, { pgPool}) => {
                // Read user info from database
                return pgdb(pgPool).getUser(args.key);
            }
        }
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    // mutation:
});

module.exports = ncSchema;