import gql from "graphql-tag";

export const DELIVERY_LIST_QUERY = gql`
  query Deliveries($query:String,$number:Int,$fromItem:Int){
    closedCampaigns(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      image
      delivery{
        id
        state
      }
    }
  }
`
