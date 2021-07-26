const graphql = require('graphql');
// const { buildResolveInfo } = require('graphql/execution/execute');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = graphql;

const {USER_LIST, Single_User} = require('./Queries/user');
const {CreateUser, UserUpdate, UserDelete} = require('./Mutations/user');

const RootQuery = new GraphQLObjectType({
    name: 'User',
    fields: {
        users: USER_LIST,
        singleuser: Single_User,
    }
});

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        CreateUser: CreateUser,
        Update: UserUpdate,
        delete: UserDelete
    }
});

module.exports = new GraphQLSchema({ query: RootQuery , mutation: Mutation})