import gql from "graphql-tag"

export const WALLET_QUERY = gql`
  query WalletQuery{
    wallet{
      id
      balance
    },
    paymentInfo{
      id
      paybillNumber
      paybillAccount
    }
  }
`;

export const WITHDRAW_MUTATION = gql`
  mutation WithdrawMutation($amount:Float!) {
    withdraw(amount:$amount){
      transaction{
        id
        state
      }
      errors{
        field
        errors
      }
      withdrawQueued
    }
  }
`
export const WITHDRAW_SUBSCRIPTION = gql`
  subscription WithdrawSubscription($transactionId:ID!){
    withdrawTransaction(transactionId:$transactionId){
      id
      successStatus
      reasonFailed
      amount
    }
  }
`


