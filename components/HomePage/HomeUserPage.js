import React from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import {graphql} from 'react-apollo';
import Loader from "../Loader";
import {APP_QUERY} from "../app/queries";
import CourseCard from "../CoursesPage/CourseCard";

class HomeUserPage extends React.Component {

  render() {
    const {
      data: {
        loading,
        error,
        user
      }
    } = this.props;
    if (loading) return <Loader/>;

    // if error  return null
    //TODO:create an error page
    if (error) return null;

    const {email, firstName, lastName} = user;
    const fullName = `${firstName} ${lastName}`;

    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <div className={"px-3 py-3"}>
                <h1>Courses</h1>
              </div>
              <MDBRow center>
                <MDBCol size={"12"} md={"4"}>
                  <CourseCard title={"My First Course"}>
                    course description
                    <div className={"w-100 text-center"}>
                      <MDBBtn className={"rounded-pill mt-3 mb-1"}>VIEW</MDBBtn>
                    </div>
                  </CourseCard>
                </MDBCol>
                <MDBCol size={"12"} md={"4"}>
                  <CourseCard title={"My First Course"}>
                    course description
                  </CourseCard>
                </MDBCol>
                <MDBCol size={"12"} md={"4"}>
                  <CourseCard title={"My First Course"}>
                    course description
                  </CourseCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

export default graphql(
  APP_QUERY,
  //coursesQuery
)(HomeUserPage);