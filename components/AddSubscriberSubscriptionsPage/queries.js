import gql from "graphql-tag";

export const SUBSCRIPTIONS_QUERY = gql`
  query Subscriptions($query:String) {
    subscriptions(query:$query){
      id
      name 
      description
      price
    }
  }`;
