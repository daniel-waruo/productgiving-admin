import gql from "graphql-tag";

export const USER_SUBSCRIPTIONS_QUERY = gql`
  query UserSubscriptions {
    user {
      id
      userSubscriptions{
        id
        balance
        subscription{
          id
          name
          description
        }
      }
    }
  }`;
