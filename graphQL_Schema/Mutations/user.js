const User = require('../../models/user');
const { GraphQLList, GraphQLString } = require('graphql');
const UserType = require('../TypeDefs/UserType');
const StatusType = require('../TypeDefs/StatusType');

CreateUser = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        // let data = User.find();
        let insertdata = new User({
            email: args.email,
            name: args.name,
            password: args.password,
        })
        const check = await User.findOne({ email: args.email });
        let resdata;
        if (!check) {
            resdata = await insertdata.save();
        } else {
            resdata = 'Already Exists Email Id!!'
        }

        return resdata

    }
}

UserUpdate = {
    type: StatusType,
    args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        let Update = {
            "$set": {
                name: args.name,
                password: args.password
            }
        }

        await User.findByIdAndUpdate(args.id, Update, { new: true });
        return {
            success: true,
            message: "Update Successfully",
            error: ''
        }

    }
}

UserDelete = {
    type: StatusType,
    args: {
        id: { type: GraphQLString },
    },
    resolve: async (parent, args) => {

       let check =  await User.findByIdAndDelete(args.id);
       if(check){
        return {
            success: true,
            message: "Delete Successfully",
            error: ''
        }
       }else{
        return {
            success: false,
            message: "",
            error: 'Id Not Found'
        }
       }
        

    }
}
module.exports = { CreateUser, UserUpdate, UserDelete }