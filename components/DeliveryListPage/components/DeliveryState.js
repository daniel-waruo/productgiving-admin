import React from "react";
import {MDBBtn} from "mdbreact";

export default class DeliveryState extends React.PureComponent{
  render() {
    const {state} = this.props;
    let color = "dark"
    if (state === "PROCESSING")
      color = "primary"
    else if (state === "READY")
      color = "warning"
    else if (state === "DELIVERED")
      color = "success"


    return (
      <MDBBtn size={"sm"} className={"mx-2 rounded-pill"} color={color}>{state}</MDBBtn>
    )
  }
}