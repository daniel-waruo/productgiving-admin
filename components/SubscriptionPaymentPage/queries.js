import gql from "graphql-tag";

export const SUBSCRIPTION_QUERY = gql`
  query PaymentSubscription($subscriptionId:ID!) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      user{
        id
        email
      }
      price
      dailyPrice
      weeklyPrice
      monthlyPrice
      yearlyPrice
    }
    user{
      id
      firstName
      lastName
      email
    }  
  }`;

export const SUBSCRIPTION_PAYMENT_MUTATION = gql`
  mutation PaySubscription($amount:Float!,$interval:String!,$frequency:Int!,$phone:String!,$subscriptionId:String!){
    paySubscription(amount:$amount,phone:$phone,interval:$interval,frequency:$frequency,subscriptionId:$subscriptionId){
      paymentPending
      transaction{
        id
      }
      errors{
        field
        errors
      }
    }
  }
`

export const PAYMENT_STATUS_SUBSCRIPTION = gql`
  subscription PaymentSubscription($transactionId:ID!){
    subscriptionTransaction(transactionId:$transactionId){
      id
      successStatus
      reasonFailed
      amount
      userSubscription{
        id
        expiryDate
        subscription{
          id
          name
        }
      }
    }
  }
`