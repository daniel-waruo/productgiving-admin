import gql from "graphql-tag";

export const SUBSCRIPTIONS_QUERY = gql`
  query Subscriptions {
    user {
      id
      subscriptions{
        id
        name
        description
      }
    }
  }`;
