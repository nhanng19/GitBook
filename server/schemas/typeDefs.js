const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    picture: String
    cover: String
    projects: [Project]!
    verified: Boolean
    friends: [User]
    followings: [User]
    followers: [User]
    details: Details
  }

  type Details {
    bio: String
    job: String
    workPlace: String
    highSchool: String
    college: String
    currentCity: String
    gender: String
    bYear: Int
    bMonth: Int
    bDay: Int
    github: String
    linkedin: String
    instagram: String
  }

  type Project {
    _id: ID
    projectName: String!
    projectDescription: String!
    projectRepo: String
    projectOwner: String
    createdAt: String
    projectMembers: [User]
    toDo: [toDo]
    inProgress: [inProgress]
    done: [done]
  }

  type toDo {
    _id: ID
    assignee: String
    description: String
  }
  type inProgress {
    _id: ID
    assignee: String
    description: String
  }
  type done {
    _id: ID
    assignee: String
    description: String
  }

  type Kanban {
    toDo: [KanbanItem]
    inProgress: [KanbanItem]
    done: [KanbanItem]
  }

  type KanbanItem {
    kanbanId: ID
    assignee: String
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input DetailsInput {
    bio: String
    job: String
    workPlace: String
    highSchool: String
    college: String
    currentCity: String
    gender: String
    bYear: Int
    bMonth: Int
    bDay: Int
    github: String
    linkedin: String
    instagram: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    projects(username: String): [Project]
    project(projectId: ID!): Project
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProject(
      projectName: String!
      projectDescription: String
      projectRepo: String
      projectOwner: String
      createdAt: String
    ): Project
    addTicket(projectId: ID!, assignee: String!, description: String!): Project
    removeTicket(projectId: ID!, kanbanId: ID!): Project
    todoProgress(
      projectId: ID!
      kanbanId: ID!
      assignee: String!
      description: String!
    ): Project
    removeProgress(projectId: ID!, kanbanId: ID!): Project
    progressDone(
      projectId: ID!
      kanbanId: ID!
      assignee: String!
      description: String!
    ): Project
    removeDone(projectId: ID!, kanbanId: ID!): Project
    doneProgress(
      projectId: ID!
      kanbanId: ID!
      assignee: String!
      description: String!
    ): Project
    progressTodo(
      projectId: ID!
      kanbanId: ID!
      assignee: String!
      description: String!
    ): Project
    removeProject(projectId: String!): Project
    addPicture(picture: String!): User
    addCover(cover: String!): User
    editDetails(
      bio: String!
      job: String!
      workPlace: String!
      highSchool: String!
      college: String!
      currentCity: String!
      gender: String!
      bYear: Int
      bMonth: Int
      bDay: Int
      github: String!
      linkedin: String!
      instagram: String!
    ): Details
    addFriend(username: String!): User
    cancelRequest(username: String!): User
  }
`;

module.exports = typeDefs;
