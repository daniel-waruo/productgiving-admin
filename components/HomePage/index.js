import React, {PureComponent} from 'react'
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Link from "next/link";
import {NextSeo} from "next-seo";

class HomePage extends PureComponent {
  render() {
    return (
      <>
        <NextSeo title={"Home"}/>
        <MDBContainer>
          <div className="text-left">
            <h1 className={"text-center"}>M-Subscribe</h1>
            <p style={{fontSize: "1.1rem"}}>
              M-Subscribe is a platform bridges customer and businesses by giving businesses the ability to give their
              customers subscription based services and products.
              We handle all payments and subscription management so as to enable this with the click of a button
            </p>
          </div>
          <h1> Continue as ...</h1>
          <MDBRow>
            <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
              <Link href={"/member"}>
                <a className={"btn btn-primary btn-lg rounded-pill"}>
                  MEMBER
                  <MDBIcon className={"mx-2"} icon={"arrow-right"}/>
                </a>
              </Link>
            </MDBCol>
            <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
              <Link href={"/subscriber"}>
                <a className={"btn btn-default btn-lg rounded-pill"}>
                  SUBSCRIBER
                  <MDBIcon className={"mx-2"} icon={"arrow-right"}/>
                </a>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}

export default HomePage
