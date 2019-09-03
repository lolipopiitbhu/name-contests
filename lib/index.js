const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const Dataloader = require('dataloader');
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);

const app =require('express')();

/*
//read the query from the command line arguments
const query=process.argv[2];
*/

const ncSchema = require('../schema');
//const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');

const { MongoClient, Logger} = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url,(err, mPool) => {

    assert.equal(err,null);

    Logger.setLevel('debug');
    Logger.filter('class',['Server']);

    app.use('/graphql', (req,res) => {

        const loaders = {
            usersByIds: new Dataloader(pgdb.getUsersByIds),
            usersByApiKeys: new Dataloader(pgdb.getUsersByApiKey),
            ContestsByUserIds: new Dataloader(pgdb.getContestsForUserIds),
            NamesByContestIds: new Dataloader(pgdb.getNamesForContestIds),

        };
        graphqlHTTP({
            schema:ncSchema,
            graphiql:true,
            context: { pgPool, mPool, loaders}
        })(req,res);
    }
    );
    /*
    //execute the querry
    graphql(ncSchema,query).then(result => {
        console.log(result);
    });
    */
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

