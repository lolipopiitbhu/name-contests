const humps = require('humps');
const _ =require('lodash');

module.exports = pgPool => {
    const orderedFor=(rows, collection, field) => {
        const data = humps.camelizeKeys(rows);
        inGroupsOfField = _.groupBy(data,field);
            return collection.map(element => {
                const elementArray = inGroupsOfField[element];
                if(elementArray){
                    return elementArray[0];
                }
            }); 
    };

    return {
        getUsersByIds(userIds){
            return pgPool.query(
                `SELECT * FROM users 
                WHERE id=ANY($1)`,
                [userIds]
            ).then(res => {
                return orderedFor(res.rows,userIds,'id'); 
            });
        },
        
        getUser(apiKey){
            return pgPool.query(
                `SELECT * FROM users 
                WHERE api_key=$1`,
                [apiKey]
            ).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            });
        },

        getContests(user){
            return pgPool.query(
                `SELECT * FROM contests 
                WHERE created_by=$1`,
                [user.id]
            ).then(res => {
                return humps.camelizeKeys(res.rows);
            });
        },

        getNames(contest){
            return pgPool.query(
                `SELECT * FROM names
                WHERE contest_id=$1`,
                [contest.id]
            ).then(res => {
                return humps.camelizeKeys(res.rows);
            });
        }
    };
};