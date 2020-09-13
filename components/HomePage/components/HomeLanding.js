import React, {PureComponent} from 'react'

import {MDBBtn, MDBCardTitle, MDBCol, MDBIcon} from "mdbreact";
import Link from "next/link";
import Jumbotron from "../../Jumbotron";

class HomeLanding extends PureComponent {

  render() {
    return (
      <Jumbotron>
        <MDBCol className="py-5 py-sm-2 text-center">
          <MDBCardTitle className="h1-responsive pt-1 pt-md-5 m-1 m-md-5 m-lg-5 font-bold">
            Engage Customers with Subscriptions
          </MDBCardTitle>
          <p className="mx-5 mb-5">
            We help you connect more with your customers by giving you the ability to
            create subscription based products and services.
            This will allow you t increase customer retention by over 100%.
          </p>
          <Link href={"/member/login"} as={"/member/login"}>
            <a>
              <MDBBtn color={"white"} className={"rounded-pill mb-5"}>
                <MDBIcon icon="dollar" className="mr-2"/>
                Join US Today
              </MDBBtn>
            </a>
          </Link>
        </MDBCol>
      </Jumbotron>
    )//content to be rendered after page load
  }
}

export default HomeLanding;
