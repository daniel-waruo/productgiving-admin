import gql from "graphql-tag";

export const TRANSACTIONS_QUERY = gql`
  query SubscriptionTransactions($query:String){
    subscriptionTransactions(query:$query){
      id
      phone
      state
      amount
      mpesaCode
      userSubscription{
        id
        subscription{
          id
          name
        }
        name
        email
      }
    }
  }
`
