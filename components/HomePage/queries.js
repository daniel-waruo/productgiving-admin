import gql from 'graphql-tag';


export const HOME_QUERY = gql`
query HomeQuery{
  donationsByDate {
      date
      number
  }
  incomeByDate {
      date
      amount
  }
  totalIncome
  totalDonated
  totalActiveCampaigns
}`;
