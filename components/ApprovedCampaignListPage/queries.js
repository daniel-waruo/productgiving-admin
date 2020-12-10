import gql from "graphql-tag";

export const APPROVED_CAMPAIGNS_QUERY = gql`
  query ApprovedCampaigns($query:String){
    approvedCampaigns(query:$query){
      id
      name
      image
      isApproved
    }
  }
`
