import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      projects {
        _id
        projectName
        projectDescription
        projectOwner
        createdAt
        toDo {
          _id
          assignee
          description
        }
        inProgress {
          _id
          assignee
          description
        }
        done {
          _id
          assignee
          description
        }
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      projects {
        _id
        projectName
        projectDescription
        projectRepo
        projectOwner
        createdAt
        toDo {
          _id
          assignee
          description
        }
        inProgress {
          _id
          assignee
          description
        }
        done {
          _id
          assignee
          description
        }
      }
      friends {
        _id
        username
        picture
      }
      followings {
        _id
        username
        picture
      }
      followers {
        _id
        username
        picture
      }
      details {
        bio
        job
        highSchool
        college
        currentCity
        gender
        bYear
        bMonth
        bDay
        github
        linkedin
        instagram
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
      createdAt
      toDo {
        _id
        assignee
        description
      }
      inProgress {
        _id
        assignee
        description
      }
      done {
        _id
        assignee
        description
      }
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
      toDo {
        _id
        assignee
        description
      }
      inProgress {
        _id
        assignee
        description
      }
      done {
        _id
        assignee
        description
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
        _id
        projectName
        projectDescription
        projectRepo
        projectOwner
        createdAt
        toDo {
          _id
          assignee
          description
        }
        inProgress {
          _id
          assignee
          description
        }
        done {
          _id
          assignee
          description
        }
      }
      friends {
        _id
        username
        picture
      }
      followings {
        _id
        username
        picture
      }
      followers {
        _id
        username
        picture
      }
      details {
        bio
        job
        highSchool
        college
        currentCity
        gender
        bYear
        bMonth
        bDay
        github
        linkedin
        instagram
      }
    }
  }
`;
