const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    github: String
    linkedin: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    projectName: String
    projectDescription: String
    projectRepo: String
    projectOwner: String
    createdAt: String
    task: [String]
  }

  type Auth {
    token: ID!
    user: User
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
      projectDescription: String!
      projectRepo: String!
    ): Project
    removeProject(projectId: String!): Project
  }
`;

module.exports = typeDefs;