import gql from "graphql-tag";

export const UNAPPROVED_CAMPAIGNS_QUERY = gql`
  query UnapprovedCampaigns($query:String,$number:Int,$fromItem:Int){
    unapprovedCampaigns(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
