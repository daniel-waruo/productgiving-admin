import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query AccountQuery {
    user{
      id
      email
      firstName
      lastName
    }
  }
`;
