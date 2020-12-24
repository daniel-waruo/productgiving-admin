import gql from "graphql-tag";

export const FEATURED_CAMPAIGNS_QUERY = gql`
  query FeaturedCampaigns($query:String,$number:Int,$fromItem:Int){
    featuredCampaigns(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
