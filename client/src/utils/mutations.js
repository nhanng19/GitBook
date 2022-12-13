// import dependency
import { gql } from '@apollo/client';

// define mutation for login
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// define mutation for adding a user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;


export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $projectDescription: String, $projectRepo: String!, $projectOwner: String, $createdAt: String) {
    addProject(projectName: $projectName, projectDescription: $projectDescription, projectRepo: $projectRepo, projectOwner: $projectOwner, createdAt: $createdAt) {
      _id
      projectName
      projectDescription
      projectRepo
      projectOwner
      createdAt
    }
  }
`;

