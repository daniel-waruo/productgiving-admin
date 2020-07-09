import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {COURSE_QUERY} from "./queries";
import {withRouter} from "next/router";

class CoursePage extends React.PureComponent {

  render() {
    const {
      data: {
        loading,
        error,
        course
      }
    } = this.props
    if (loading)
      return <Loader/>
    if (error)
      return <h1>ERROR MESSAGE</h1>
    const {name} = course
    return <h1 className={"text-center"}>COURSE NAME : {name}</h1>
  }
}

export default withRouter(
  compose(
    graphql(COURSE_QUERY, {
      options: (props) => {
        const {courseId} = props.router.query;
        return {
          variables: {courseId}
        }
      }
    })
  )(CoursePage)
)