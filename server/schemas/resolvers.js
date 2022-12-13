const { AuthenticationError } = require("apollo-server-express");
<<<<<<< HEAD
const { User } = require("../models");
=======
const { User, Project } = require("../models");
>>>>>>> 4116f16ccd2a6a88f64ed1df9c54a37baa58562b
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
<<<<<<< HEAD
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
=======
      users: async () => {
        return User.find().populate('projects');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('projects');
      },
      projects: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Project.find(params).sort({ createdAt: -1 });
      },
      project: async (parent, { projectId }) => {
        return Project.findOne({ _id: projectId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('projects');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },
  Mutation: {
    addProject: async (
      parent,
      { projectName, projectDescription, projectRepo },
      context
    ) => {
      if (context.user) {
        const project = await Project.create({
          projectName,
          projectDescription,
          projectRepo,
          projectOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );

        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project._id } }
        );

        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
>>>>>>> 4116f16ccd2a6a88f64ed1df9c54a37baa58562b
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
<<<<<<< HEAD

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
=======
>>>>>>> 4116f16ccd2a6a88f64ed1df9c54a37baa58562b
  },
};

module.exports = resolvers;
