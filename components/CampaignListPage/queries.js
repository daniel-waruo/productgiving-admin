import gql from "graphql-tag";

export const CAMPAIGNS_QUERY = gql`
  query Campaigns($query:String,$number:Int,$fromItem:Int){
    campaigns(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
