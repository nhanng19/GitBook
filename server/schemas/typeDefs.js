const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProject(savedProjects: Project): User
        removeProject(projectId: String!): User
    }

    type User {
        _id: ID
        username: String!
        email: String!
        github: String
        linkedin: String
        myProjects: [String]
    }

    input Project {
        projectId: ID
        projectName: String!
        projectDescription: String!
        task: String
        collaborators: [String]
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;