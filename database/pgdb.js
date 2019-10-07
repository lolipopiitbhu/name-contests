const { orderedFor } = require('../lib/util');
const { slug } = require('../lib/util');
const humps = require('humps');


module.exports = pgPool => {
    return {
        getUsersByIds(userIds){
            return pgPool.query(
                `SELECT * FROM users 
                WHERE id=ANY($1)`,
                [userIds]
            ).then(res => {
                return orderedFor(res.rows,userIds,'id',true); 
            });
        },
        
        getUsersByApiKey(apiKeys){
            return pgPool.query(
                `SELECT * FROM users 
                WHERE api_key=ANY($1)`,
                [apiKeys]
            ).then(res => {
                return orderedFor(res.rows,apiKeys,'apiKey',true);
            });
        },

        getContestsForUserIds(userIds){
            return pgPool.query(
                `SELECT * FROM contests 
                WHERE created_by=ANY($1)`,
                [userIds]
            ).then(res => {
                return orderedFor(res.rows,userIds,'createdBy',false);
            });
        },

        getNamesForContestIds(contestIds){
            return pgPool.query(
                `SELECT * FROM names
                WHERE contest_id=ANY($1)`,
                [contestIds]
            ).then(res => {
                return orderedFor(res.rows,contestIds,'contestId',false);
            });
        },

        addNewContest({apiKey,title,description}){
            return pgPool.query(
                `INSERT INTO contests(code, title, description, created_by) 
                    VALUES($1,$2,$3,
                    (SELECT id FROM users WHERE api_key=$4))
                    returning *`,
                    [slug(title),title,description,apiKey]).then(res => {
                        return humps.camelizeKeys(res.rows[0]);
                    }
            )
        }
    };
};