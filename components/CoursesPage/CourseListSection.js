import React from 'react'
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import CourseCard from "./CourseCard";
import PropTypes from 'prop-types'
import Link from "next/link";

class CoursesListSection extends React.PureComponent {

  render() {
    const {courses} = this.props;
    //list of the courses
    const coursesList = courses.map(
      ({id, name, description}, key) => (
        <MDBCol key={key} size={"12"} md={"4"}>
          <CourseCard title={name}>
            {description}
            <div className={"w-100 text-center"}>
              <Link href={'/courses/[courseId]'} as={`/courses/${id}`}>
                <a className={"btn btn-default rounded-pill mt-3 mb-1"}>MANAGE SUBSCRIPTION</a>
              </Link>
            </div>
          </CourseCard>
        </MDBCol>
      )
    )
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <div className={"px-3 py-3"}>
                <h1>Courses</h1>
              </div>
              <MDBRow>
                {coursesList}
                <MDBCol size={"12"} md={"4"}>
                  <CourseCard title={'Add Course'}>
                    <div className={"w-100 text-center"}>
                      <Link href={'/courses/add'} as={`/courses/add`}>
                        <a className={"btn btn-default rounded-pill mt-3 mb-1"}>
                          <MDBIcon icon={"plus"} size={"lg"}/>
                        </a>
                      </Link>
                    </div>
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

CoursesListSection.propTypes = {
  courses: PropTypes.array.isRequired
}
export default CoursesListSection