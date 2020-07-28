import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query {
    user{
      id
      email
      firstName
      lastName
    }
    paymentInfo{
      id
      paybillNumber
      paybillAccount
    }
    messages @client {
      type
      text
    }
  }
`;
