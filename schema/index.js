// Import type helpers from graphql-js
const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

//const pgdb =require('../database/pgdb');
const UserType = require('./types/user')

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
            type: UserType,
            description:'current user identified by api key',
            args:{
                apiKey: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (obj, args, { loaders}) => {
                // Read user info from database
                return loaders.usersByApiKeys.load(args.apiKey);
                //return pgdb(pgPool).getUser(args.key);
            }
        }
    }
});

const addContestMutation = require('./mutations/add-contest');

const RootMutationType = new GraphQLObjectType({
    name: "RootMutationType",

    fields: () => ({
            addContest: addContestMutation
        })
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;