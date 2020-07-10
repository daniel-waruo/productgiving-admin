import gql from 'graphql-tag';


export const loginWithGoogle = gql`
    mutation LoginWithGoogle($accessToken:String,$code:String){
      loginWithGoogle(accessToken:$accessToken,code:$code){
        errors{
          field
          errors
        }
        token
      }
    }
  `
;
