import gql from "graphql-tag";

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
  }
`