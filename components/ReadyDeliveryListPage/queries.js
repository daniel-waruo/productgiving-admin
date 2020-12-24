import gql from "graphql-tag";

export const READY_DELIVERY_LIST_QUERY = gql`
  query ReadyDeliveries($query:String,$number:Int,$fromItem:Int){
    readyCampaigns(query:$query,number:$number,fromItem:$fromItem){
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
