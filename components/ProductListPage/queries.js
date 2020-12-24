import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products($query:String,$number:Int,$fromItem:Int) {
    products(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      description
      price
      image
    }
  }`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($id:ID!){
    product(id:$id){
      id
      name
      description
      slug
      price
      image
    }
  }`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id:Int!){
    deleteProduct(id:$id){
      success
      errors{
        field
        messages
      }
    }
  }
`;
