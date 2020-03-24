import gql from 'graphql-tag';

export default gql`
  
  type Message{
    type : String
    text : String
  }
  
  extend type Query {
    messages : [Message]
    login : [Message]
  }
  
  extend type Mutation {  
    
    login(email:String! ,password:String) : Boolean
    
    socialLogin(url:String!,accessToken:String!) : Boolean
    
    register(
      email : String! ,
      username : String!,
      password1 : String!,
      password2 : String!
    ) : Boolean
      
    logout : Boolean
    
    
    addMessage(message:String!) : Boolean
  }
`;
