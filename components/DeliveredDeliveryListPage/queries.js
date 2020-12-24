import gql from "graphql-tag";

export const DELIVERED_DELIVERY_LIST_QUERY = gql`
  query DeliveredDeliveries($query:String,$number:Int,$fromItem:Int){
    deliveredCampaigns(query:$query,number:$number,fromItem:$fromItem){
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
