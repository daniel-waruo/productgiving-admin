import gql from 'graphql-tag';


export const SUBSCRIPTION_QUERY = gql`
  query Subscription($subscriptionId:ID) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      description
      dailyPrice
      weeklyPrice
      monthlyPrice
      yearlyPrice
    }
  }`;

export const EDIT_SUBSCRIPTION_MUTATION = gql`
  mutation EditSubscription($id:String,$name:String!,$dailyPrice:Float,$weeklyPrice:Float,$monthlyPrice:Float,$yearlyPrice:Float,$description:String){ 
    editSubscription(id:$id,name:$name,dailyPrice:$dailyPrice,weeklyPrice:$weeklyPrice,monthlyPrice:$monthlyPrice,yearlyPrice:$yearlyPrice,description:$description){
      subscription{
        id
        name
        description
        dailyPrice
        weeklyPrice
        monthlyPrice
        yearlyPrice
      }
      errors{
        field
        errors
      }
    }
  }
`