import gql from 'graphql-tag';

export const ADD_USER_MUTATION = gql`
  mutation AddUserMutation($firstName: String!, $lastName: String!,$email:String!,$phone:String!) {
    createAdminUser(firstName: $firstName, lastName: $lastName,email:$email,phone:$phone) {
      user {
        id
        firstName
        lastName
        email
        phone
      }
      errors{
        field
        messages
      }
    }
}
`;
