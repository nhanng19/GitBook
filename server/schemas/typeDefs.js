const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProject(savedProjects: myProject): User
        removeProject(projectId: ID!): User
    }

    type: User {
        _id: ID
        username: String!
        email: String!
        password: String!
        github: String
        linkedin: String
        myProjects: [Project]
    }

    type Project {
        projectId: ID
        projectName: String!
        projectDescription: String!
        task: String
        collaborators: [User]
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;