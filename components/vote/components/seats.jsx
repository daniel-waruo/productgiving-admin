import React from 'react'
import Link from 'next/link'
import {MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol} from "mdbreact";

function SeatCardImage(props) {
  const {alt, src} = props;
  return (
    <img className={"float-right rounded-circle z-depth-1"}
         alt={alt}
         src={src}/>
  )
}

export class SeatCard extends React.Component {
  render() {
    // get data from props
    const {
      className,
      seat: {
        name,
        slug,
        voted
      }
    } = this.props;

    let imageContent = (
      <SeatCardImage
        alt={`No user has been selected for ${name} seat`}
        src={'/unknownPerson.png'}/>
    );

    if (voted) {
      const {image, firstName, lastName} = voted;
      imageContent = (
        <SeatCardImage
          alt={`Picture of ${firstName} ${lastName} selected for ${name} seat`}
          src={`${image}-/resize/75x75/`}/>
      )
    }
    return (
      <Link href={"vote/[slug]"} as={`vote/${slug}`}>
        <a>
          <MDBCard className={className + " text-dark"}>
            <MDBCardBody>
              <h4 className={"pl-5"}>
                <span className={" position-absolute pt-4"}>{name}</span>
                {imageContent}
              </h4>
            </MDBCardBody>
          </MDBCard>
        </a>
      </Link>
    )
  }
}

export class UserVoted extends React.Component {
  render() {
    return (
      <>
        <MDBRow center className={"f-100"}>
          <MDBCol size={"9"} md={"6"} className={"my-auto"}>
            <h3 className={"text-center my-3"}>You have already voted view results instead</h3>
            <Link href={"vote/results"}>
              <a>
                <MDBBtn className={"rounded-pill cyan darken-4 text-center w-100"} style={{fontSize: "0.8rem"}}>
                  <MDBIcon icon={"poll-h"} className={"mx-2"}/>
                  View Results
                </MDBBtn>
              </a>
            </Link>
          </MDBCol>
        </MDBRow>
      </>
    )
  }
}