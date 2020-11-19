import gql from "graphql-tag";

export const DELIVERY_QUERY = gql`
query DeliveryQuery($id: ID!) {
  campaign(id: $id) {
    id
    name
    description
    slug
    image
    donationNumber
    delivery{
      id
      state
      products{
        id
        number
        product{
          id
          image
          name
        }
      }
    }
  }
}
`;


export const NEXT_DELIVERY_STATE_MUTATION = gql`
  mutation NextDeliveryStateMutation($id:Int!){
    nextDeliveryState(id:$id){
      success
      errors{
        field
        messages
      }
    }
  }
`;