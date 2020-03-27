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
        candidates{
          id
          firstName
          lastName
          image
        }
        voted @client{
          id
          firstName
          lastName
          image
        }
      }
    }
  }
`;

export const candidatesQuery = gql`
  query Candidates($slug: String!){
    candidates(slug:$slug){
      id
      firstName
      lastName
      image
      seat{
        slug
      }
      selected @client
    }
  }
`;

export const candidateQuery = gql`
  query Candidate($id: String!){
    candidate(id:$id){
      id
      firstName
      lastName
      image
    }
  }
`;

export const voteMutation = gql`
  mutation Vote($seatSlug:String!,$candidateID:String!){
    vote(seatSlug:$seatSlug,candidateID:$candidateID) @client
  }
`;