import React from "react";
import LoginForm from "../../LoginPage/components/LoginForm";
import PropTypes from "prop-types";
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";

const scope =
  'openid ' +
  'https://www.googleapis.com/auth/userinfo.profile ' +
  'https://www.googleapis.com/auth/userinfo.email ';

export default class PaymentLoginForm extends React.PureComponent {
  clickHandler = () => {
    this.props.nextStep('amount')
  }

  render() {
    // check if user is authenticated then allow the form
    if (!this.props.user)
      return <LoginForm scope={scope} redirectUrl={`/courses/${this.props.subscription.courseId}/pay`}/>

    const {subscription: {course: {id, user: {email}}}} = this.props;

    const isCreator = email === this.props.user.email
    // check if the owner is trying to pay the subscription
    // he has created
    if (isCreator) {
      return (
        <MDBContainer>
          <h1>Operation Not Allowed</h1>
          <p>You are not allowed to pay your own subscription.Login to another google account</p>
          <LoginForm scope={scope} redirectUrl={`/courses/${id}/pay`}/>
        </MDBContainer>
      )
    }
    const {firstName, lastName} = this.props.user

    return (
      <MDBContainer className={"text-center py-5"}>
        <MDBBtn onClick={this.clickHandler} size={"lg"} color={"white"}>
          Continue as {`${firstName} ${lastName}`}
          <MDBIcon className={"ml-3"} icon={"arrow-right"}/>
        </MDBBtn>
      </MDBContainer>
    )
  }
}

PaymentLoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired
}