import gql from 'graphql-tag'

export const voteQuery = gql`
  query {
    election {
      id
      name
      seats {
        id
        name
        slug
      }
    }
  }
`;

export const candidatesQuery = gql`
  query Candidates($slug: String!){
    candidates(slug:$slug){
      firstName
      lastName
      image
    }
  }
`;