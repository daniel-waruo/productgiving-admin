import React from "react";
import PaymentForm from "./PaymentForm";
import {MDBContainer} from "mdbreact";

export default class PayForSubscription extends React.PureComponent {
  render() {
    return (
      <MDBContainer>
        <h1 className={"text-capitalize"}>Pay For {this.props.plan} Membership</h1>
        <PaymentForm plan={this.props.plan} price={this.props.price}/>
      </MDBContainer>
    )
  }
}