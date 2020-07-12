import React from 'react';
import {MDBAlert, MDBAnimation, MDBCol, MDBRow} from 'mdbreact';
import {GoogleLogin} from "react-google-login";
import {GOOGLE_CONFIG} from "../../../_constants";
import {APP_QUERY} from "../../app/queries";
import {login} from "../../../apollo/resolvers/auth";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {loginWithGoogle} from "../queries";
import GoogleButton from "./GoogleButton";

const {client_id} = GOOGLE_CONFIG;


class LoginForm extends React.PureComponent {
  state = {
    errors: [],
    loading: false
  }

  responseGoogle = response => {
    this.setState({loading: true});
    this.props.loginWithGoogle({
      refetchQueries: [
        {query: APP_QUERY},
      ],
      variables: {
        code: response.code
      }
    }).then(
      ({data: {loginWithGoogle}}) => {
        // check if the token is in the data
        // call the login function
        if (loginWithGoogle.token) {
          // operation successful
          login(loginWithGoogle.token, this.props.redirectUrl)
        } else {
          this.setState({errors: loginWithGoogle.errors, loading: false})
        }
      }
    );
  };

  render() {
    const nonFieldErrors = this.state.errors ?
      this.state.errors.map(
        (error, key) => {
          if (error.field === 'non_field_errors') {
            return error.errors.map(
              (error, key) => (
                <MDBAnimation type={"fadeInDown"}>
                  <MDBAlert key={key} color={"danger"} className={"text-center z-depth-1 mb-4"}>{error}</MDBAlert>
                </MDBAnimation>
              )
            )
          }
        }
      ) : null;

    const {loading} = this.state;
    let {scope} = this.props;

    if (!scope) {
      scope = GOOGLE_CONFIG.scope
    }
    return (
      <>
        <MDBRow className={"h-100"} center>
          <MDBCol size={"11"}
                  md="6" lg={"5"} className={"m-auto z-depth-1 bg-white"}
                  style={{borderRadius: "1rem"}}>
            {nonFieldErrors}
            <div className={"p-3"}>
              <h2 className={"text-center text-dark"}>Sign In With Google</h2>
              <div className={"d-flex justify-content-right mt-4 mb-5 ml-3"}>
                <GoogleLogin
                  clientId={client_id}
                  scope={scope}
                  render={renderProps => <GoogleButton {...renderProps} loading={loading}/>}
                  buttonText="Login"
                  accessType="offline"
                  responseType={"code"}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

export default compose(
  graphql(loginWithGoogle, {name: 'loginWithGoogle'})
)(LoginForm)
