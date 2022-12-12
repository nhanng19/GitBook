const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get log in info
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
          return user;
        } catch (err) {
          console.log("Unable to find user data", err);
        }
      }
      throw new AuthenticationError("Please log in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        // find a user matching provided email
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("No user with this email address");
        }
        // check if password is correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log("Login error", err);
      }
    },

    addUser: async (parent, { username, email, password }) => {
      try {
        // create user using provided usename, email, and password
        const user = await User.create({ username, email, password });
        // create token from user and return both
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log("Sign up error", err);
      }
    },

    // addImage: async (parent, { userId, url }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: userId },
    //       {
    //         $addToSet: {
    //           profile: {
    //             url,
    //           },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    // removeImage: async (parent, { userId, profileId }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: userId },
    //       {
    //         $pull: {
    //           profile: {
    //             _id: profileId,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
