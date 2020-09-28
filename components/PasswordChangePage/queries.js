import gql from "graphql-tag";

export const PASSWORD_CHANGE_MUTATION = gql`
  mutation ChangePassword($oldPassword:String!,$newPassword1:String!,$newPassword2:String!){
    changePassword(oldPassword:$oldPassword,newPassword1:$newPassword1,newPassword2:$newPassword2){
      success
      errors{
        field
        messages
      }
    }
  }
`