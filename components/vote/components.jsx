import React from 'react'
import Link from 'next/link'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBIcon} from "mdbreact";

export function SeatCard(props) {
  const {title, className, href, icon} = props;

  return (
    <Link href={"vote/[slug]"} as={href}>
      <MDBCard tag={"a"} className={className}>
        <MDBCardBody>
          <MDBCardTitle className={"pl-5"}>
            {title}
            <MDBIcon fas icon={"user-alt-slash"} className={"float-right mr-3"}/>
          </MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    </Link>
  )
}

export function CandidateCard(props) {
  const {className, candidate,selected} = props;

  const {firstName, lastName, image} = candidate;

  let icon = (<MDBIcon size={"2x"} far icon={"circle"} className={"float-right mx-1 text-light"}/>);

  if (selected){
    icon = (
      <MDBIcon size={"2x"} far icon={"check-circle"} className={"float-right mx-1 text-success"}/>
    )
  }

  return (
    <MDBCard className={className}>
      <MDBCardBody>
        <img className={"float-left rounded-circle z-depth-1"}
             alt={`Picture of ${firstName} ${lastName}`}
             src={`${image}-/resize/75x75/`}/>
        <h4 className={"mt-3"} style={{marginLeft: "30%"}}>
          {`${firstName} ${lastName}`}
          {icon}
        </h4>
      </MDBCardBody>
    </MDBCard>
  )
}