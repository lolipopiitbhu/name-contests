// Import type helpers from graphql-js
const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

//const pgdb = require('../../database/pgdb');
const NameType = require('./names');
const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
    name: 'ContestType',

    fields:{
        id:{
            type: GraphQLID
        },
        code:{
            type: new GraphQLNonNull(GraphQLString)
        },
        title:{
            type: new GraphQLNonNull(GraphQLString)
        },
        description:{
            type: GraphQLString
        },
        status:{
            type: new GraphQLNonNull(ContestStatusType)
        },
        createdAt:{
            type: new GraphQLNonNull(GraphQLString)
        },
        names:{
            type: new GraphQLList( NameType ),
            resolve(obj, args, { loaders }){
                return loaders.NamesByContestIds.load(obj.id);
                //return pgdb(pgPool).getNames(obj);
            }
        }
    }
});