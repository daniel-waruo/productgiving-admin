import React from 'react'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {APP_QUERY} from "../app/queries";
import {COURSES_QUERY} from "../HomePage/queries";
import CoursesListSection from "./CourseListSection";
import compose from "lodash.flowright"

class CoursePage extends React.PureComponent {

  render() {
    const {
      data: {
        loading,
        error,
        courses
      }
    } = this.props;
    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    return (
      <>
        <CoursesListSection courses={courses}/>
      </>
    )
  };
}

export default compose(
  graphql(APP_QUERY),
  graphql(COURSES_QUERY)
)(CoursePage);