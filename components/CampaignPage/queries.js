import gql from "graphql-tag";

export const CAMPAIGN_QUERY = gql`
  query CampaignQuery($id: ID!) {
    campaign(id: $id) {
      id
      name
      description
      slug
      image
      isApproved
      products {
        id
        target
        product {
          id
          name
          price
          image
        }
      }
      owner{
        id
        firstName
        lastName
        email
        phone
        dateJoined
      }
    }
  }
`

export const APPROVE_CAMPAIGN_MUTATION = gql`
  mutation ApproveCampaign($id:Int!){
    approveCampaign(id:$id){
      campaign{
        id
        name
        description
        isApproved
      }
    }
  }
`;


export const DISAPPROVE_CAMPAIGN_MUTATION = gql`
  mutation DisapproveCampaign($id:Int!){
    disapproveCampaign(id:$id){
      campaign{
        id
        name
        description
        isApproved
      }
    }
  }
`;