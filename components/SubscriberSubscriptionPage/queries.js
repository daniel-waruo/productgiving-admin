import gql from 'graphql-tag';


export const COURSE_QUERY = gql`
  query Course($courseId:ID) {
    course(courseId:$courseId){
      id
      name
      description
      subscription{
        id
        price
        subscriberCount
        totalPaid
        transactionsCount
        activeSubscribers{
          id
          name
          email
          balance
        }
        inActiveSubscribers{
          id
          name
          email
          balance
        }
      }
    }
  }`;

export const USER_SUBSCRIPTION_QUERY = gql`
  query UserSubscription($subscriptionId:ID) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      description
      price
    }
    userSubscription(subscriptionId:$subscriptionId){
      id
      balance
      expiryDate
    }
  }`;
