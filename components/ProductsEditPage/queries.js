import gql from 'graphql-tag';

export const EDIT_PRODUCT_MUTATION = gql`
  mutation EditProductMutation($id:Int!,$name: String!, $description: String!,$price:Decimal!,$image:String!) {
    editProduct(id:$id,name: $name, description: $description,price:$price,image:$image) {
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
