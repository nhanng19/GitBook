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
    kanban: Kanban
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
    removeProject(projectId: String!): Project
    addPicture(picture: String!): User
    addCover(cover: String!): User
    editDetails(details: DetailsInput): Details
  }
`;

module.exports = typeDefs;
