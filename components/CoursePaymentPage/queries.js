import gql from "graphql-tag";

export const SUBSCRIPTION_QUERY = gql`
  query Subscription($courseId:String!) {
    subscription(courseId:$courseId){
      id
      courseId
      price
      user{
        id
        email
      }
    }
    user{
      id
      firstName
      lastName
      email
    }  
  }`;