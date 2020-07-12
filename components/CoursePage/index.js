import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {COURSE_QUERY} from "./queries";
import Router, {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import CourseStudentsSection from "./CourseStudentsSection";
import AdminCard from "../HomePage/components/AdminCard";

class CoursePage extends React.PureComponent {
  state = {
    copied: false
  }
  copyPaymentLink = paymentLink => {
    navigator.clipboard.writeText(paymentLink)
    this.setState({copied: true})
  }

  render() {
    const {data: {loading, error, course}} = this.props;
    if (loading)
      return <Loader/>
    if (error)
      return <h1>ERROR {error.message}</h1>
    if (!course)
      return  <h1>No COurse</h1>
    const {id, name, students, subscription} = course;

    if (!subscription) {
      Router.push(`/courses/${id}/edit`)
      return null
    }
    let studentNumber = 0;
    if (students)
      studentNumber = students.length
    const paymentLink = `${window.location.origin}/courses/${id}/pay`
    return (
      <MDBContainer className={"py-3 px-3"}>
        <h1>{name}</h1>
        <MDBRow>
          <MDBCol size={"12"}>
            <MDBRow>
              <MDBCol size={"12"} md={"6"} lg={"4"}>
                <AdminCard title={"Students"} iconClass={"fa-user"} value={studentNumber.toString()}/>
              </MDBCol>
              <MDBCol size={"12"} md={"6"} lg={"4"}>
                <AdminCard title={"Total Earnings"} iconClass={"fa-money-bill"} value={"40000"}/>
              </MDBCol>
              <MDBCol size={"12"} md={"6"} lg={"4"}>
                <AdminCard title={"Total Link Visits"} iconClass={"fas fa-user"} value={"4000"}/>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol size={"12"} className={"px-3"}>
            <MDBContainer className={"my-2 py-3 z-depth-1 "} style={{borderRadius: "1rem"}}>
              <h2>Payment Link</h2>
              <MDBContainer>
                <p>
                  <a href={paymentLink} target="_blank">{paymentLink}</a>
                  <MDBBtn size={"sm"} className={"px-2 ml-3"} onClick={() => this.copyPaymentLink(paymentLink)}>
                    <MDBIcon icon={"copy"} className={"mx-2 rounded"}/>
                    {this.state.copied ? "COPIED" : "COPY"}
                  </MDBBtn>
                </p>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={"12"} className={"px-3 mt-2"}>
            <MDBContainer className={"my-2 pt-3 pb-5 z-depth-1 "} style={{borderRadius: "1rem"}}>
              <h2 className={"text-underline"}>Students</h2>
              <CourseStudentsSection/>
            </MDBContainer>
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
  )(CoursePage)
)