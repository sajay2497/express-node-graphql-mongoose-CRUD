const User = require('../../models/user');
const { GraphQLList, GraphQLString } = require('graphql');
const UserType = require('../TypeDefs/UserType');

const USER_LIST = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args, context) => {
        // let mycontext = await context();
        // console.log(mycontext.host);
        let data = User.find();
        return data
    }
}

const Single_User = {
    type: UserType,
    args: {
        email: { type: GraphQLString }
    },
    resolve: async (parent, args, context) => {
        let data = User.findOne({ email: args.email });
        return data
    }
}

module.exports = { USER_LIST, Single_User }