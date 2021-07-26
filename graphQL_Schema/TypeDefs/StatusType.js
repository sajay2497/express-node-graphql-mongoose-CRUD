const graphql = require('graphql');
// const { buildResolveInfo } = require('graphql/execution/execute');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphql;



const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        success: { type: graphql.GraphQLBoolean },
        message: { type: GraphQLString },
        error: { type: GraphQLString }
    })
});



module.exports = StatusType;