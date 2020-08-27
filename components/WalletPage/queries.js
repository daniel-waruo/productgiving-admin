import gql from "graphql-tag"

export const WALLET_QUERY = gql`
  query WalletQuery{
    wallet{
      id
      balance
    },
    paymentProfile{
      id
      phone
      paybillNumber
      paybillAccount
    }
  }
`;

export const WITHDRAW_MUTATION = gql`
  mutation WithdrawPaybillMutation($amount:Float!) {
    withdrawPaybill(amount:$amount){
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
export const WITHDRAW_PHONE_MUTATION = gql`
  mutation WithdrawPhoneMutation($amount:Float!) {
    withdrawPhone(amount:$amount){
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
      wallet{
        id
        balance
      }
    }
  }
`


