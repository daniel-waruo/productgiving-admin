import React, {PureComponent} from 'react'

import {MDBBtn, MDBCardTitle, MDBCol, MDBIcon, MDBJumbotron, MDBMask, MDBView} from "mdbreact";
import Link from "next/link";


class Home extends PureComponent {

  render() {
    return (
      <div className={"bg"}>
        <MDBView className={"f-100"}>
          <MDBMask className="flex-center bg-gradient-cool">
            <MDBJumbotron style={{padding: 0}} className={"bg-transparent f-100"}>
              <MDBCol className="text-white text-center  py-md-1 py-5 px-md-1 px-4 ">
                <MDBCol className="py-5 py-sm-2">
                  <MDBCardTitle className="h1-responsive pt-1 pt-md-5 m-1 m-md-5 m-lg-5 font-bold">
                    Monetize your Google Classroom Classes
                  </MDBCardTitle>
                  <p className="mx-5 mb-5">
                    We help you get the most of your classes offering a transparent model to allow you to
                    receive and verify payments made to your class.
                  </p>
                  <Link href={"/login"} as={"/login"}>
                    <MDBBtn tag={"a"} className="mb-5 rounded-pill">
                      <MDBIcon icon="dollar" className="mr-2"/>
                      Set Up Your Account
                    </MDBBtn>
                  </Link>
                </MDBCol>
              </MDBCol>
            </MDBJumbotron>
          </MDBMask>
        </MDBView>
      </div>
    )//content to be rendered after page load
  }
}

export default Home;
