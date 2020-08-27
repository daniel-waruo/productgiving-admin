import gql from "graphql-tag";

export const PLAN_PAYMENT_MUTATION = gql`
  mutation PayPlanSubscription($plan:String!,$monthsNo:Int!,$phone:String!){
    payMemberPlan(plan:$plan,phone:$phone,monthsNo:$monthsNo){
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