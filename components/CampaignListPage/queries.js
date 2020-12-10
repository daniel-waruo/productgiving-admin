import gql from "graphql-tag";

export const CAMPAIGNS_QUERY = gql`
  query Campaigns($query:String){
    campaigns(query:$query){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
