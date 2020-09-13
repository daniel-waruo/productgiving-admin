import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query Users($query:String){
    users(query:$query){
      id
      firstName
      lastName
      phone 
      email
    }
  }
`
