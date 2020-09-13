import gql from 'graphql-tag';


export const loginWithGoogle = gql`
    mutation LoginWithGoogle($accessToken:String,$code:String,$imageUrl:String){
      loginWithGoogle(accessToken:$accessToken,code:$code,imageUrl:$imageUrl){
        errors{
          field
          errors
        }
        token
      }
    }
  `
;

export const LOGIN_MUTATION = gql`
  mutation Login($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
      errors{
        field
        messages
      }
    }
  }
`