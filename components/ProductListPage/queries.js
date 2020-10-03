import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products($query:String) {
    products(query:$query){
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
      images
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
