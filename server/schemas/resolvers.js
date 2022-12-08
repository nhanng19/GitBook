const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/')

const resolvers = {
    Query: {
        // get log in info
        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    const user = await User.findOne({ _id: context.user._id });
                    return user;
                } catch (err) {
                    console.log('Unable to find user data', err);
                }
            }
            throw new AuthenticationError('Please log in');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            try {
                // find a user matching provided email
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('No user with this email address')
                }
                // check if password is correct
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect password');
                }
                
                return { token, user };
            }   catch (err) {
                console.log('Login error', err)
            }
        },

        addUser: async (parent, { username, email, password }) => {
            try {
                // create user using provided usename, email, and password
                const user = await User.create({ username, email, password });
                // create token from user and return both
                const token = signToken(user);
                return { token, user };
            }   catch (err) {
                console.log('Sign up error', err);
            }
        },
    },
};

module.exports = resolvers;