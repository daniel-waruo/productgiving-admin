import gql from 'graphql-tag';


export const loginWithGoogle = gql`
    mutation LoginWithGoogle($accessToken:String!){
      loginWithGoogle(accessToken:$accessToken){
        errors{
          field
          errors
        }
        token
      }
    }
  `
;
