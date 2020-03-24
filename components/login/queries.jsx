import gql from 'graphql-tag';


export const
  login = gql`
  mutation Login($email:String , $password:String ){
    login(email :$email , password:$password) @client
  }
`,
  loginQueries = gql`
  query LoginErrors{
    user{
      id
    }
    loginErrors @client {
      type
      text
    }
  }
`,
  socialLogin = gql`
  mutation SocialLogin($url:String!,$accessToken:String!){
    socialLogin(url:$url,accessToken:$accessToken)@client
  }
  `
;
