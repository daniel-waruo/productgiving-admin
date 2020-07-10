import gql from 'graphql-tag';


export const COURSE_QUERY = gql`
  query Course($courseId:ID!) {
    course(courseId:$courseId){
      id
      name
      descriptionHeading
      students{
        userId
        name
        email
      }
      subscription{
        id
      }
    }
  }`;
