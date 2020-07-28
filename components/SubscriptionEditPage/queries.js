import gql from 'graphql-tag';


export const SUBSCRIPTION_QUERY = gql`
  query Subscription($subscriptionId:ID) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      description
      price
    }
  }`;

export const EDIT_SUBSCRIPTION_MUTATION = gql`
  mutation EditSubscription($id:String,$name:String!,$price:Float!,$description:String){ 
    editSubscription(id:$id,name:$name,price:$price,description:$description){
      subscription{
        id
        name
        description
        price
      }
      errors{
        field
        errors
      }
    }
  }
`