import gql from "graphql-tag";

export const SUBSCRIPTION_QUERY = gql`
  query PaymentSubscription($subscriptionId:ID!) {
    subscription(subscriptionId:$subscriptionId){
      id
      user{
        id
        email
      }
      price
    }
    user{
      id
      firstName
      lastName
      email
    }  
  }`;

export const SUBSCRIPTION_PAYMENT_MUTATION = gql`
  mutation PaySubscription($amount:Float!,$phone:String!,$subscriptionId:String!){
    paySubscription(amount:$amount,phone:$phone,subscriptionId:$subscriptionId){
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
    transaction(transactionId:$transactionId){
      id
      successStatus
      reasonFailed
    }
  }
`