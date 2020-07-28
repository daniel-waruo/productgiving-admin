import gql from 'graphql-tag';

export default gql`
  extend type Mutation {
    logout : Boolean
  }
`;
