import gql from "graphql-tag";

export const PHONE_VERIFICATION_MUTATION = gql`
  mutation PaymentPhoneVerificationMutation($code:String!){
    verifyPaymentPhone(code:$code){
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
export const RESEND_VERIFICATION_CODE_MUTATION = gql`
  mutation {
   resendPhoneVerification{
     successStatus
   } 
  }
`;