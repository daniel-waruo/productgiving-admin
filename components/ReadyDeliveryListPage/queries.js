import gql from "graphql-tag";

export const DELIVERY_LIST_QUERY = gql`
  query Deliveries($query:String){
    readyCampaigns(query:$query){
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
