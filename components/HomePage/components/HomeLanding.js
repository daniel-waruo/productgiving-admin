import React, {PureComponent} from 'react'

import {MDBCardTitle, MDBCol, MDBIcon} from "mdbreact";
import Link from "next/link";
import Jumbotron from "../../Jumbotron";

class HomeLanding extends PureComponent {

  render() {
    return (
      <Jumbotron>
        <MDBCol className="py-5 py-sm-2 text-center">
          <MDBCardTitle className="h1-responsive pt-1 pt-md-5 m-1 m-md-5 m-lg-5 font-bold">
            Monetize your Google Classroom Classes
          </MDBCardTitle>
          <p className="mx-5 mb-5">
            We help you get the most of your classes offering a transparent model to allow you to
            receive and verify payments made to your class.
          </p>
          <Link href={"/login"} as={"/login"}>
            <a className="btn btn-default mb-5 rounded-pill">
              <MDBIcon icon="dollar" className="mr-2"/>
              Set Up Your Account
            </a>
          </Link>
        </MDBCol>
      </Jumbotron>
    )//content to be rendered after page load
  }
}

export default HomeLanding;
