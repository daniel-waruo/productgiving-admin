import gql from "graphql-tag";

export const APPROVED_CAMPAIGNS_QUERY = gql`
  query ApprovedCampaigns($query:String,$number:Int,$fromItem:Int){
    approvedCampaigns(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      image
      isApproved
    }
  }
`
