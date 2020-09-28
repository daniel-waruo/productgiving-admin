import React from "react"
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {NextSeo} from "next-seo"
import {resetPassword} from "./queries";
import {FormAlerts, MutationForm} from "../Form";
import {Field} from "../FIeld";
import {format_errors} from "../../_helpers";

class PasswordSent extends React.Component {

  render() {
    return (
      <div>
        <h1 className={"light-green-text"}>Reset Email Sent </h1>
        <p>Check your email and follow the reset link to change your password</p>
      </div>
    )
  }
}

class ForgotPassword extends React.Component {
  state = {
    email: '',
    errors: {},
    sent: false
  };

  changeHandler = (e) => {
    this.setState({email: e.target.value})
  };

  completeHandler = ({resetPassword: {success, errors}}) => {
    if (errors) {
      this.setState({
        errors: format_errors(errors)
      });
    }
    else
      this.setState({sent: success})
  };

  render() {
    // if email sent return password sent component
    if (this.state.sent) return <PasswordSent/>;

    // get errors from state
    const {errors} = this.state;

    return (
      <>
        <NextSeo
          title={"Password Reset"}
          description={"Reset your password"}
        />
        <MDBRow center>
          <MDBCol size={"10"} sm={"8"} md={"7"}>
            <MutationForm data={{email: this.state.email}}
                          mutation={resetPassword}
                          onCompleted={this.completeHandler}>
              <FormAlerts errors={errors.email}/>
              <h2 className={"text-center"}>Password Reset</h2>
              <div className={"pt-4"}>
                <Field
                  label={"Type your email"}
                  icon={"envelope"}
                  type={"email"}
                  required
                  initial={this.state.email}
                  onChange={this.changeHandler}
                />
                <div className="text-center">
                  <MDBBtn outline
                          type="submit"
                          color={"light-green"}
                          className={"rounded-pill mx-2"}>
                    <MDBIcon className={"mx-4"} icon="lock-open"/>
                    Reset Your Password
                  </MDBBtn>
                </div>
              </div>
            </MutationForm>
          </MDBCol>
        </MDBRow>
      </>
    )
  }
}

export default ForgotPassword