import gql from 'graphql-tag';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProductMutation($name: String!, $description: String!,$price:Decimal!,$image:String!) {
    createProduct(name: $name, description: $description,price:$price,image:$image) {
      product{
        id
        name
        description
        price
        image
      }
      errors{
        field
        messages
      }
    }
}
`;
