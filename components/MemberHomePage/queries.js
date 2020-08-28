import gql from 'graphql-tag';


export const MEMBER_HOME_QUERY = gql`
  query MemberHomeQuery{
    wallet{
      id
      balance
    }
    totalEarnings
    totalSubscribers
    revenueTransactions {
      time
      amount
    }
  }
`
