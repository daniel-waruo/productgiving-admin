import gql from 'graphql-tag';


export const COURSES_QUERY = gql`
  query Courses {
    courses{
      id
      name
      description
    }
  }`;

export const REVENUE_DATA_QUERY = gql`
  query RevenueDataQuery {
    revenueTransactions {
      time
      amount
    }
  }
`

export const MEMBER_HOME_QUERY = gql`
  query MemberHomeQuery{
    wallet{
      id
      balance
    }
    totalEarnings
    totalSubscribers
  }
`
