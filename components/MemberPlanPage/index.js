import React from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";

class MemberPlanPage extends React.Component {
  render() {
    return (
      <MDBContainer>
        <h3 className="my-5 h3 text-center">Membership pricing plans</h3>
        <MDBRow className="text-center">
          <MDBCol lg={"4"} md={"12"} className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>
                  <strong>Free</strong>
                </h4>
              </MDBCardHeader>
              <MDBCardBody>
                <h3 className="card-title pricing-card-title mb-4">$0
                  <small className="text-muted">/ mo</small>
                </h3>
                <ol className="list-unstyled mb-4">
                  <li>
                    7% commission
                    <MDBIcon icon={"check"} className="green-text ml-1"/>
                  </li>
                  <hr/>
                </ol>
                <MDBBtn outline className="rounded-pill">Sign up for free</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg={"4"} md={"12"} className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>
                  <strong>Basic</strong>
                </h4>
              </MDBCardHeader>
              <MDBCardBody>
                <h3 className="card-title pricing-card-title mb-4">
                  Ksh.1000<small className="text-muted">/ mo</small>
                </h3>
                <ol className="list-unstyled mb-4">
                  <li>
                    5% commission
                    <MDBIcon icon={"check"} className="green-text ml-1"/>
                  </li>
                </ol>
                <MDBBtn className={"rounded-pill"}>Get started</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg={"4"} md={"12"} className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>
                  <strong>Pro</strong>
                </h4>
              </MDBCardHeader>
              <MDBCardBody>
                <h3 className="card-title pricing-card-title mb-4">
                  Ksh.2000<small className="text-muted">/ mo</small>
                </h3>
                <ol className="list-unstyled mb-4">
                  <li>
                    3% commission
                    <MDBIcon icon={"check"} className="green-text ml-1"/>
                  </li>
                </ol>
                <MDBBtn className="rounded-pill">Get started</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default MemberPlanPage