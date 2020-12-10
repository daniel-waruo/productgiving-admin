import gql from "graphql-tag";

export const FEATURED_CAMPAIGNS_QUERY = gql`
  query FeaturedCampaigns($query:String){
    featuredCampaigns(query:$query){
      id
      name
      image
      isApproved
      isFeatured
    }
  }
`
