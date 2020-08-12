import React, {PureComponent} from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
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
            <p style={{fontSize: "1.1rem"}} className={'text-center'}>
              M-Subscribe is a platform bridges customer and businesses by giving businesses the ability to give their
              customers subscription based services and products.
              <br/>
              We handle all payments and subscription management so as to enable this with the click of a button
            </p>
          </div>
          <h1 className={'mt-2 mb-4'}> Continue as ...</h1>
          <MDBRow>
            <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
              <Link href={"/member"}>
                <a>
                  <MDBBtn tag={"span"} color={"teal"} size={"lg"}  className={"rounded-pill"}>
                    subscription owner
                    <MDBIcon className={"mx-2"} icon={"arrow-right"}/>
                  </MDBBtn>
                </a>
              </Link>
            </MDBCol>
            <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
              <Link href={"/subscriber"}>
                <a>
                  <MDBBtn tag={"span"} color={"teal"} size={"lg"} className={"rounded-pill"}>
                    subscriber
                    <MDBIcon className={"mx-2"} icon={"arrow-right"}/>
                  </MDBBtn>
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
