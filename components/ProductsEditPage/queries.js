import gql from 'graphql-tag';

export const EDIT_PRODUCT_MUTATION = gql`
  mutation EditProductMutation($id:Int!,$name: String!, $description: String!,$price:Decimal!,$images:[String]) {
    editProduct(id:$id,name: $name, description: $description,price:$price,images:$images) {
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
