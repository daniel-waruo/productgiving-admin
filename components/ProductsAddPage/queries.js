import gql from 'graphql-tag';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProductMutation($name: String!, $description: String!,$price:Decimal!,$images:[String]) {
    createProduct(name: $name, description: $description,price:$price,images:$images) {
      product{
        id
        name
        description
        price
        images
      }
      errors{
        field
        messages
      }
    }
}
`;
