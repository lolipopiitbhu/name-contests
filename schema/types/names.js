const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

// const pgdb =require('../../database/pgdb');
const mbd = require('../../database/mdb');

module.exports = new GraphQLObjectType({
    name:'NameType',

    fields: () => {
        const UserType = require('./user');
        return{

            id:{
                type: GraphQLID
            },
            contestId:{
                type: GraphQLID
            },
            label:{
                type: GraphQLString
            },
            normalizedLabel:{
                type: GraphQLString
            },
            description:{
                type:GraphQLString
            },
            createdAt:{
                type:GraphQLString
            },
            createdBy:{
                type: new GraphQLNonNull(UserType),
                resolve(obj, args, { loaders }){
                    return loaders.userByIds.load(obj.createdBy);
                    //return pgdb(pgPool).getUserById(obj.createdBy);
                }
            }
        }
        

    }
});