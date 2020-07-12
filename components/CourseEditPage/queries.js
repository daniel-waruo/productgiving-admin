import gql from 'graphql-tag';


export const SUBSCRIPTION_QUERY = gql`
  query Subscription($courseId:String!) {
    subscription(courseId:$courseId){
      id
      price
      courseId
    }
  }`;

export const EDIT_WEEKLY_SUBSCRIPTION_MUTATION = gql`
  mutation EditWeeklySubscriptionMutation($courseId:String!,$price:Float!){
    editWeeklySubscription(courseId:$courseId,price:$price){
      subscription{
        id
        price
      }
      errors{
        field
        errors
      }
    }
  }
`;