import gql from "graphql-tag";

export const UNAPPROVED_CAMPAIGNS_QUERY = gql`
  query UnapprovedCampaigns($query:String){
    unapprovedCampaigns(query:$query){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
