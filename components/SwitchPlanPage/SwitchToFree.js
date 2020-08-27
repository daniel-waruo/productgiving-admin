import React from "react";
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";

export default class SwitchToFree extends React.PureComponent {
  render() {
    const {plan} = this.props;
    return (
      <MDBContainer className={"text-center"}>
        <h1 className={"text-capitalize"}>Switch from {plan.name} to Free </h1>
        <p className={"text-info py-5"}>
          If you switch from {plan.name} to free we will transfer the monetary worth of the valid time
          left into your wallet.
        </p>
        <MDBBtn size={"lg"} className={"rounded-pill"}>
          SWITCH
          <MDBIcon icon={"arrow-right"} className={"ml-3"}/>
        </MDBBtn>
      </MDBContainer>
    )
  }
}