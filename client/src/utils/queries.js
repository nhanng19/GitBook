import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      github
      linkedin
      projects {
        projectName
        projectDescription
        projectOwner
        createdAt
        task
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      projectName
      projectDescription
      projectRepo
      projectOwner
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleproject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      projectName
      projectDescription
      projectOwner
      projectRepo
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            github
            linkedin
            projects {
                _id
                projectName
                projectDescription
                projectRepo
                projectOwner
                createdAt
                task
            }  
        }
    }
`;

