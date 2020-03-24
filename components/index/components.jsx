import React from "react";
import Router from "next/router";
import {MDBCard, MDBCardBody, MDBCardTitle} from "mdbreact";

export function SeatCard(props) {
  const {title, className, href, icon} = props;
  const onClick = e => {
    e.preventDefault();
    Router.push(href || "/")
  };

  return (
    <MDBCard className={className} onClick={onClick}>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  )
}
