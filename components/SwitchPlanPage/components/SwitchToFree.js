import React from "react";
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";
import {graphql} from "react-apollo";
import {SWITCH_TO_FREE_MUTATION} from "../queries";
import {redirect} from "../../app/components";

class SwitchToFree extends React.PureComponent {
  clickHandler = () => {
    this.props.switchToFree().then(
      ({data: {switchToFree: {successStatus}}}) => {
        if (successStatus)
          redirect('/member/account/member-plan')
      }
    )
  }

  render() {
    const {plan} = this.props;
    return (
      <MDBContainer className={"text-center"}>
        <h1 className={"text-capitalize"}>Switch from {plan.name} to Free </h1>
        <p className={"text-info py-5"}>
          If you switch from {plan.name} to free we will transfer the monetary worth of the valid time
          left into your wallet.
        </p>
        <MDBBtn size={"lg"} className={"rounded-pill"} onClick={this.clickHandler}>
          SWITCH
          <MDBIcon icon={"arrow-right"} className={"ml-3"}/>
        </MDBBtn>
      </MDBContainer>
    )
  }
}

export default graphql(SWITCH_TO_FREE_MUTATION, {name: 'switchToFree'})(SwitchToFree)