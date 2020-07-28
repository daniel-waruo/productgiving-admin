import gql from "graphql-tag";

export const PAYMENT_INFO_MUTATION = gql`
  mutation PaymentInfoMutation($paybillNumber:String!,$paybillAccount:String!){
    editPaymentInfo(paybillNumber:$paybillNumber,paybillAccount:$paybillAccount){
      paymentInfo{
        id
        paybillNumber
        paybillAccount
      }
      errors{
        field
        errors
      }
    } 
  }
`;

export const PAYMENT_INFO_QUERY = gql`
  query PaymentInfoQuery {
    paymentInfo{
      id
      paybillNumber
      paybillAccount
    }
  }
`