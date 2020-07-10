import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import Router, {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {EDIT_WEEKLY_SUBSCRIPTION_MUTATION, SUBSCRIPTION_QUERY} from "./queries";
import Loader from "../Loader";
import {COURSE_QUERY} from "../CoursePage/queries";

class CourseEditPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      price: 10,
      loading: false
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const {courseId} = this.props.router.query
    const {price} = this.state
    // call mutation
    this.props.editWeeklySubscription({
      variables: {price, courseId},
      refetchQueries: [
        {
          query: COURSE_QUERY,
          variables: {courseId}
        }
      ]
    }).then(
      ({data: {editWeeklySubscription}}) => {
        if (editWeeklySubscription.errors)
          this.setState({
              errors: editWeeklySubscription.errors,
              loading: false
            }
          )
        else {
          Router.push('/courses/[courseId]',`/courses/${courseId}`)
        }
      }
    )
  }
  changeHandler = value => {
    this.setState({
      price: value
    })
  }

  render() {
    const {data: {error, loading, subscription}} = this.props;
    if (error)
      return <h1>{error.message}</h1>

    if (loading)
      return <Loader/>
    let defaultPrice = "10"
    if (subscription)
      defaultPrice = subscription;
    return (
      <MDBContainer>
        <h1 className={"text-center"}>Course Weekly Subscription</h1>
        <form onSubmit={this.submitHandler}>
          <MDBRow center>
            <MDBCol size={"12"} md={"6"}>
              <p className={"mb-0"} style={{fontSize: "1rem"}}>
                Set the price you will be charging per week (Sun - Sat) ..eg 100.
                The value should not be less than 10 shillings
              </p>
            </MDBCol>

            <MDBCol size={"12"}/>
            <MDBCol size={"12"} md={"6"}>
              <MDBInput
                min={"10"}
                type={"number"}
                required
                disabled={this.state.loading}
                valueDefault={defaultPrice}
                value={this.state.price}
                label={"Weekly Charge in KES"}
                onChange={this.changeHandler}
              />
            </MDBCol>
            <MDBCol size={"12"}/>
            <MDBCol size={"12"} md={"6"} className={"text-center"}>
              <MDBBtn className={"rounded-pill"} type={"submit"} disabled={this.state.loading}>
                <MDBIcon icon={"money"} className={"mx-2 rounded-pill"}/>
                SUBMIT SUBSCRIPTION
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {courseId} = props.router.query;
        return {
          variables: {courseId}
        }
      }
    }),
    graphql(EDIT_WEEKLY_SUBSCRIPTION_MUTATION, {name: "editWeeklySubscription"})
  )(CourseEditPage)
)