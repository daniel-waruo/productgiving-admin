import gql from 'graphql-tag';


export const COURSES_QUERY = gql`
  query Courses {
    courses{
      id
      name
      description
    }
  }`;

