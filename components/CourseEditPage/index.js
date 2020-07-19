import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact';
import {COURSES_QUERY} from "../HomePage/queries";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {EDIT_COURSE_MUTATION} from "./queries";
import Loader from "../Loader";
import {COURSE_QUERY} from "../CoursePage/queries";

class CourseEditPage extends React.PureComponent {

  state = {
    name: "",
    description: "",
    price: "",
    errors: [],
    submitted: false
  }

  completeHandler = ({editCourse: {course, errors}}) => {
    if (course) {
      // redirect to course page
      this.props.router.push(`/courses/[courseId]`, `/courses/${course.id}`)
    } else {
      // set loading state to false
      this.setState({
        loading: false,
        submitted: true,
        errors: errors
      })
    }
  };

  changeHandler = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {name, price, description} = this.state;
    const {data: {course}} = this.props;
    const {courseId} = this.props.router.query;
    return {
      id: courseId ? courseId : undefined,
      name: name ? name : course.name,
      price: price ? price : course.subscription.price,
      description: description ? description : course.description
    }
  };

  mutationOptions = {
    refetchQueries: [{query: COURSES_QUERY}]
  };

  render() {

    const {data: {error, loading, course}} = this.props;

    if (error)
      return <h1>{error.message}</h1>

    if (loading)
      return <Loader/>
    const {submitted, errors} = this.state;
    return (
      <MDBContainer className={"pr-5"}>
        <MDBRow center>
          <MDBCol size={"11"} md={"10"}>
            <h1 className={"text-center"}>Course Weekly Subscription</h1>
            <MutationForm data={this.getFormData()}
                          onCompleted={this.completeHandler}
                          mutation={EDIT_COURSE_MUTATION}
                          mutationOptions={this.mutationOptions}>
              <MDBRow center>
                <MDBCol size={"12"}>
                  <Field
                    submitted={submitted}
                    label={"Course Name"}
                    initial={course ? course.name : ""}
                    required
                    fieldErrors={errors.name}
                    onChange={
                      e => this.changeHandler(
                        {name: e.target.value}
                      )
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <Field
                    rows={"4"}
                    type={"textarea"}
                    submitted={submitted}
                    label={"Course Description"}
                    initial={course ? course.description : ""}
                    required
                    fieldErrors={errors.description}
                    onChange={
                      e => this.changeHandler(
                        {description: e.target.value}
                      )
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"} md={"6"}>
                  <p className={"mb-0"} style={{fontSize: "1rem"}}>
                    Set the price you will be charging per week (Sun - Sat) ..eg 100.
                    The value should not be less than 10 shillings
                  </p>
                  <Field
                    min={"10"}
                    type={"number"}
                    submitted={submitted}
                    label={"Weekly Charge in KSH"}
                    initial={course ? course.subscription.price : ""}
                    required
                    fieldErrors={errors.price}
                    onChange={
                      e => this.changeHandler(
                        {price: e.target.value}
                      )
                    }
                  />
                </MDBCol>
                <MDBCol size={"12"}/>
                <MDBCol size={"12"} md={"6"} className={"text-center"}>
                  <MDBBtn className={"rounded-pill"} type={"submit"}>
                    <MDBIcon icon={"money"} className={"mx-2 rounded-pill"}/>
                    SUBMIT
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MutationForm>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
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
  )(CourseEditPage)
)