const humps = require('humps');
const _ =require('lodash');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',

 /*
  fromSnakeCase(GraphQLType){
    return{
      type: GraphQLType,
      resolve: (obj, args, ctx, { fieldName }) => {
        return obj[humps.decamelize(fieldName)];
      }
    }
  }
  */


 orderedFor: (rows, collection, field,singleObject) => {
    const data = humps.camelizeKeys(rows);
    inGroupsOfField = _.groupBy(data,field);
        return collection.map(element => {
            const elementArray = inGroupsOfField[element];
            if(elementArray){
                return singleObject ? elementArray[0] : elementArray;
            }
            return singleObject ? {} : [];
        }); 
  },

  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/,'-');
  }

};

