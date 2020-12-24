import gql from "graphql-tag";

export const PROCESSING_DELIVERY_LIST_QUERY = gql`
  query ProcessingDeliveries($query:String,$number:Int,$fromItem:Int){
    processingCampaigns(query:$query,number:$number,fromItem:$fromItem){
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
