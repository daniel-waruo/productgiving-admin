import React from "react";
import {MDBBtn,MDBIcon} from "mdbreact";


const BoolIcon = ({bool}) =>{
  if (bool)
    return (
      <MDBBtn size={"sm"} outline className={"mx-2 rounded-pill"} color={"success"}>
        <MDBIcon icon="check"/>
      </MDBBtn>
    )
  return (
    <MDBBtn size={"sm"} outline className={"mx-2 rounded-pill"} color={"danger"}>
      <MDBIcon icon="times"/>
    </MDBBtn>
  )
}

export default BoolIcon;
