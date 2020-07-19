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
