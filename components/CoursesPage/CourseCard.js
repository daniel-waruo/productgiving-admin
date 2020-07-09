import React from "react";
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from "mdbreact";
import PropTypes from 'prop-types'

export default class CourseCard extends React.PureComponent {
  render() {
    return (
      <MDBCard className={"my-3"} {...this.props} role={"button"} >
        <MDBCardBody>
          <MDBCardTitle className={"pl-2 pb-2 border-bottom border-dark"} style={{fontSize:"1.2rem"}}>
            {this.props.title}
          </MDBCardTitle>
          <MDBCardText tag={"div"}>
            {this.props.children}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}