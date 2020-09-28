import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import {APP_QUERY} from "../../App/queries";
import {FormAlerts, MutationForm} from "../../Form";
import {Field} from "../../FIeld";
import Link from "next/link";
import {LOGIN_MUTATION} from "../queries";
import {login} from "../../../apollo/resolvers/auth";
import {format_errors} from "../../../_helpers";


class LoginForm extends React.PureComponent {
  state = {
    email: '',
    password: '',
    errors: {}
  };
  mutationOptions = {
    refetchQueries: [
      {query: APP_QUERY}
    ]
  };

  onChange = object => {
    this.setState(object)
  };

  getFormData = () => {
    /**
     * Function get form data from state
     */
    const {errors, ...formData} = this.state;
    return formData;
  };

  completeHandler = ({login: {token, errors}}) => {
    if (!token) {
      this.setState({errors: format_errors(errors)});
    } else
      login(token, this.props.redirectUrl)
  };

  render() {
    const {nonFieldErrors} = this.state.errors;
    return (
      <>
        <MDBRow center>
          <MDBCol size={"11"} md={"9"} lg={"6"} className={"rounded p-2"}>
            <MutationForm data={this.getFormData()}
                          onCompleted={this.completeHandler}
                          mutation={LOGIN_MUTATION}
                          mutationOptions={this.mutationOptions}>

              <FormAlerts errors={nonFieldErrors}/>
              <div className={"p-3"}>
                <h1 className="text-center mb-4">Login</h1>
                <Field
                  label="Type your email"
                  icon="envelope"
                  type={"email"}
                  onChange={e => {
                    this.onChange({email: e.target.value})
                  }}
                />
                <Field
                  label="Type your password"
                  icon="lock"
                  type="password"
                  onChange={e => {
                    this.onChange({password: e.target.value})
                  }}
                />

                <p>Forgotten your password ?
                  <Link href={"/account/password/reset"}>
                    <a className={"green-text py-2"}> click here</a>
                  </Link>
                </p>
                <div className="text-center">
                  <MDBBtn
                    color={"light-green"}
                    type="submit"
                    style={{fontSize: "1rem"}}
                    className={"rounded-pill w-100"}>
                    Login
                    <MDBIcon className={"mx-4"} icon="sign-in-alt"/>
                  </MDBBtn>
                </div>
              </div>
            </MutationForm>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

export default LoginForm
