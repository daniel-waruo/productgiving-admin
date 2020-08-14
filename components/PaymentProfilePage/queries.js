import gql from "graphql-tag";

export const PAYMENT_PROFILE_MUTATION = gql`
  mutation PaymentProfileMutation($phone:String!){
    editPaymentProfile(phone:$phone){
      paymentProfile{
        id
        paybillNumber
        paybillAccount
        phone
        phoneVerified
      }
      errors{
        field
        errors
      }
    } 
  }
`;

export const PAYMENT_PROFILE_QUERY = gql`
  query PaymentProfileQuery {
    paymentProfile {
      id
      paybillNumber
      paybillAccount
      phone
      phoneVerified
    }
  }
`