import React from 'react';
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import {GoogleLogin} from "react-google-login";
import {GOOGLE_CONFIG} from "../../../_constants";
import {APP_QUERY} from "../../app/queries";
import {login} from "../../../apollo/resolvers/auth";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {loginWithGoogle} from "../queries";

const {client_id, scope} = GOOGLE_CONFIG;

const refetchQueries = [
  {query: APP_QUERY},
];


class LoginForm extends React.PureComponent {
  state = {
    errors: [],
    loading: false
  }

  responseGoogle = async response => {
    await this.setState({loading: true});
    await this.props.loginWithGoogle({
      variables: {
        code: response.code
      },
      refetchQueries: refetchQueries
    }).then(
      ({data: {loginWithGoogle}}) => {
        // check if the token is in the data
        // call the login function
        if (loginWithGoogle.token) {
          // operation successful
          login(loginWithGoogle.token)
        } else {
          this.setState({errors: loginWithGoogle.errors})
        }
        this.setState({loading: false})
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

    const loader = loading ? (
      <div className="spinner-border text-primary mx-3" style={{width: "1rem", height: "1rem"}} role="status">
          <span className="sr-only">
            Loading...
          </span>
      </div>
    ) : null;

    return (
      <>
        <MDBRow className={"h-100"}>
          <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
            {nonFieldErrors}
            <div className={"p-3"}>
              <h1 className={"text-center text-grey"}>Log in with</h1>
              <div className={"d-flex justify-content-center mb-3"}>
                <GoogleLogin
                  clientId={client_id}
                  scope={scope}
                  render={renderProps => (
                    <MDBBtn onClick={renderProps.onClick} disabled={renderProps.disabled}
                            className={"rounded-pill w-100"}>
                      <MDBIcon className={"mx-4 align-middle"} size={"2x"} fab icon="google"/>
                      <span style={{fontSize: "1rem"}}>Google</span>
                      {loader}
                    </MDBBtn>
                  )}
                  buttonText="Login"
                  approvalPrompt="force"
                  accessType="offline"
                  prompt={"consent"}
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
