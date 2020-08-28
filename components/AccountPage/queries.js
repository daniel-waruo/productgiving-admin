import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query AccountQuery {
    user{
      id
      email
      firstName
      lastName
      plan {
        name
        monthlyPrice
        commission
        expiryDate
        isActive
      }
    }
    paymentProfile{
      id
      phone
      paybillNumber
      paybillAccount
    }
    memberProfile{
      id
      organisationName
    }
    plan{
      name
      monthlyPrice
      commission
    }
  }
`;
