import gql from "graphql-tag";

export const PENDING_DELIVERY_LIST_QUERY = gql`
  query PendingDeliveries($query:String,$number:Int,$fromItem:Int){
    pendingCampaigns(query:$query,number:$number,fromItem:$fromItem){
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
