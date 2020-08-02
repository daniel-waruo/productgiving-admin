import gql from "graphql-tag";

export const MEMBER_PROFILE_MUTATION = gql`
  mutation MemberProfileMutation($organisationName:String!,$accountPassword:String!){
    editMemberProfile(organisationName:$organisationName,accountPassword:$accountPassword){
      memberProfile{
        id
        organisationName
        accountPassword
      }
      errors{
        field
        errors
      }
    } 
  }
`;

export const MEMBER_PROFILE_QUERY = gql`
  query MemberProfileQuery {
    memberProfile{
      id
      organisationName
      accountPassword
    }
  }
`