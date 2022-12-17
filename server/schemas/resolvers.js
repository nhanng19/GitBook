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
    },
    addTicket: async (
      parent,
      { projectId, assignee, description },
      context
    ) => {
      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { toDo: { assignee, description } } },
        {
          new: true,
          runValidators: true,
        }
      );
      return project;
    },
    removeTicket: async (parent, { projectId, kanbanId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              toDo: {
                _id: kanbanId,
              },
            },
          },
          { new: true }
        );
      }
    },
    todoProgress: async (
      parent,
      { projectId, kanbanId, assignee, description },
      context
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { inProgress: { assignee, description } } },
          { new: true }
        );
      }
    },
    removeProgress: async (parent, { projectId, kanbanId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              inProgress: {
                _id: kanbanId,
              },
            },
          },
          { new: true }
        );
      }
    },
    progressDone: async (
      parent,
      { projectId, kanbanId, assignee, description },
      context
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { done: { assignee, description } } },
          { new: true }
        );
      }
    },
    removeDone: async (parent, { projectId, kanbanId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              done: {
                _id: kanbanId,
              },
            },
          },
          { new: true }
        );
      }
    },
    doneProgress: async (
      parent,
      { projectId, kanbanId, assignee, description },
      context
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { inProgress: { assignee, description } } },
          { new: true }
        );
      }
    },
    progressTodo: async (
      parent,
      { projectId, kanbanId, assignee, description },
      context
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $addToSet: { toDo: { assignee, description } } },
          { new: true }
        );
      }
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
      throw new AuthenticationError("You need to be logged in!");
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
      throw new AuthenticationError("You need to be logged in!");
    },
    editDetails: async (
      parent,
      {
        bio,
        job,
        workPlace,
        highSchool,
        college,
        currentCity,
        gender,
        bYear,
        bMonth,
        bDay,
        github,
        linkedin,
        instagram,
      },
      context
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            details: {
              bio: bio,
              job: job,
              workPlace: workPlace,
              highSchool: highSchool,
              college: college,
              currentCity: currentCity,
              gender: gender,
              bYear: bYear,
              bMonth: bMonth,
              bDay: bDay,
              github: github,
              linkedin: linkedin,
              instagram: instagram,
            },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { username }, context) => {
      // TODO: make if statement to avoid adding myself friend.

      if (context.user) {
        const sender = await User.findById(context.user._id);
        const receiver = await User.findOne({ username });

        // check if sender already made friend request, or friend with receiver

        if (
          !receiver.requests.includes(sender._id) &&
          !receiver.friends.includes(sender._id)
        ) {
          await receiver.findOneAndUpdate({
            $addToSet: { requests: sender._id },
          });
          await receiver.findOneAndUpdate({
            $addToSet: { followers: sender._id },
          });
          await sender.findOneAndUpdate({
            $addToSet: { following: receiver._id },
          });
          return [sender, receiver];
        }
        throw new AuthenticationError(
          "You already requested friend to the user"
        );
      }
    },
    cancelRequest: async (parent, { username }, context) => {
      if (context.user.username !== username) {
        const sender = await User.findById(context.user._id);
        const receiver = await User.findOne({ username });
        // check if sender already made friend request, or friend with receiver
        if (
          receiver.requests.includes(sender._id) &&
          !receiver.friends.includes(sender._id)
        ) {
          await receiver.findOneAndUpdate({
            $pull: { requests: sender._id },
          });
          await receiver.findOneAndUpdate({
            $pull: { followers: sender._id },
          });
          await sender.findOneAndUpdate({
            $pull: { following: receiver._id },
          });
          return [sender, receiver];
        }

        throw new AuthenticationError("You can't cancel a request to yourself");
      }
    },
    // follow: async (parent, { username }, context) => {
    //   if (context.user.username !== username) {
    //     const sender = await User.findById(context.user._id);
    //     const receiver = await User.findOne({ username });
    //     // check if sender already made friend request, or friend with receiver
    //     if (
    //       !receiver.followers.includes(receiver.username._id) &&
    //       !receiver.friends.includes(sender._id)
    //     ) {
    //       await receiver.findOneAndUpdate({
    //         $addToSet: { followers: sender._id },
    //       });
    //       await sender.findOneAndUpdate({
    //         $addToSet: { following: receiver._id },
    //       });
    //       return [sender, receiver];
    //     }

    //     throw new AuthenticationError("You can't cancel a request to yourself");
    //   }
    // },
    // unFollow: async (parent, { username }, context) => {
    //   if (context.user.username !== username) {
    //     const sender = await User.findById(context.user._id);
    //     const receiver = await User.findOne({ username });
    //     // check if sender already made friend request, or friend with receiver
    //     if (
    //       receiver.requests.includes(sender._id) &&
    //       receiver.friends.includes(sender._id)
    //     ) {
    //       await receiver.findOneAndUpdate({
    //         $pull: { followers: sender._id },
    //       });
    //       await sender.findOneAndUpdate({
    //         $pull: { following: receiver._id },
    //       });
    //       return [sender, receiver];
    //     }

    //     throw new AuthenticationError("You can't cancel a request to yourself");
    //   }
    // },
    // cancelRequest: async (parent, { username }, context) => {
    //   if (context.user.username !== username) {
    //     const sender = await User.findById(context.user._id);
    //     const receiver = await User.findOne({ username });
    //     // check if sender already made friend request, or friend with receiver
    //     if (
    //       receiver.requests.includes(sender._id) &&
    //       receiver.friends.includes(sender._id)
    //     ) {
    //       await receiver.findOneAndUpdate({
    //         $pull: { followers: sender._id },
    //       });
    //       await sender.findOneAndUpdate({
    //         $pull: { following: receiver._id },
    //       });
    //       return [sender, receiver];
    //     }

    //     throw new AuthenticationError("You can't cancel a request to yourself");
    //   }
    // }, 
  },
};

module.exports = resolvers;

// activate account mutation: (not using yet)
