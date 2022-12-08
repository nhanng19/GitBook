import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            github
            linkedin
            myProjects {
                projectName
                projectDescription
                task
            }
            
        }
    }
`