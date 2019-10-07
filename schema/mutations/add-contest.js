const{
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require('graphql');

const pgdb =require('../../database/pgdb');
const ContestType = require('../types/contest');

const ContestInputType = new GraphQLInputObjectType({
    name: "contestInput",
    fields:{
        apiKey:{
            type: new GraphQLNonNull(GraphQLID)
        },
        title:{
            type: new GraphQLNonNull(GraphQLString)
        },
        description:{
            type: GraphQLString
        }

    }
});

module.exports = {
    type : ContestType,
    args : {
        input: {
            type: new GraphQLNonNull (ContestInputType)
        }
    },
    resolve(obj,{input},{pgPool}){
        return pgdb(pgPool).addNewContest(input);
    }
};