import gql from "graphql-tag"

export const resetPassword = gql`
  mutation ResetPassword($email:String!){
    resetPassword(email:$email){
      success
      errors{
        field
        messages
      }
    }
  }
`;