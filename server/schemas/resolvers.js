const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("projects").select("-__v -password");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("projects")
        .select("-__v -password");
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
        return User.findOne({ _id: context.user._id }).populate("projects");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addProject: async (
      parent,
      { projectName, projectDescription, projectRepo, createdAt },
      context
    ) => {
      if (context.user) {
        const project = await Project.create({
          projectName,
          projectDescription,
          projectRepo,
          projectOwner: context.user.username,
          createdAt,
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
    addPicture: async (parent, { picture }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { picture: picture },
          // { $pull: { picture: {} }},
          // { $addToSet: { picture: picture }},
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addCover: async (parent, { cover }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { cover: cover },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;

// activate account mutation: (not using yet)
