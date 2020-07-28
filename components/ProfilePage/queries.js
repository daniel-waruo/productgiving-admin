import gql from 'graphql-tag';

export const USER_EDIT_PROFILE_MUTATION = gql`
  mutation EditUserProfileMutation($firstName: String!, $lastName: String!) {
    editUserProfile(firstName: $firstName, lastName: $lastName) {
      user {
        id
        email
        firstName
        lastName
        __typename
      }
    }
}
`;
