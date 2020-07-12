import React from "react";
import LoginForm from "../../LoginPage/components/LoginForm";
import PropTypes from "prop-types";
import {MDBBtn, MDBContainer} from "mdbreact";

const scope =
  'openid ' +
  'https://www.googleapis.com/auth/userinfo.profile ' +
  'https://www.googleapis.com/auth/userinfo.email ';

export default class PaymentLoginForm extends React.PureComponent {
  clickHandler = () =>{
    this.props.nextStep('amount')
  }
  render() {
    // check if user is authenticated then allow the form
    if (!this.props.user)
      return <LoginForm scope={scope} redirectUrl={`/courses/${this.props.subscription.courseId}/pay`}/>

    const {subscription: {user: {email}}} = this.props;
    // check if the owner is trying to pay the subscription
    // he has created
    if (email === this.props.user.email) {
      return (
        <MDBContainer>
          <h1>Operation Not Allowed</h1>
          <p>You are not allowed to pay your own subscription</p>
        </MDBContainer>
      )
    }
    const {firstName, lastName} = this.props.user

    return (
      <MDBContainer className={"text-center py-5"}>
        <MDBBtn onClick={this.clickHandler} size={"lg"} color={"white"}>Continue as {`${firstName} ${lastName}`}</MDBBtn>
      </MDBContainer>
    )
  }
}

PaymentLoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  nextStep:PropTypes.func.isRequired
}