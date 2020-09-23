import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products($query:String) {
    products(query:$query){
      id
      name 
      description
      price
      images
    }
  }`;
