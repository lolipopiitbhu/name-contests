// Import type helpers from graphql-js
const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

//const pgdb =require('../../database/pgdb');
const mbd = require('../../database/mdb');
const ContestType = require('./contest');
//const {fromSnakeCase} = require('../../lib/util');

module.exports = new GraphQLObjectType({
    name: 'UserType',

    fields:{
        id:{
            type: GraphQLID
        },
        email:{
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type : GraphQLString
        },
        fullName:{
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },

        contests:{
            type: new GraphQLList(ContestType),
            resolve(obj, args, { loaders}){
                return loaders.ContestsByUserIds.load(obj.id);
                //return pgdb(pgPool).getContests(obj);
            }
        },

        contestsCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mbd(mPool).getCounts(obj,fieldName);
            }
        },

        namesCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mbd(mPool).getCounts(obj,fieldName);
            }
        },

        votesCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mbd(mPool).getCounts(obj,fieldName);
            }
        }
        
    }
});