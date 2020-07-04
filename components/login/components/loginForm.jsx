import React from 'react';
import {MDBAlert, MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import {GoogleLogin} from "react-google-login";
import {CLIENT_IDS} from "../../../_constants";
import {APP_QUERY} from "../../app/queries";

const {google} = CLIENT_IDS;

const refetchQueries = [
  {query: APP_QUERY},
];

export default class LoginForm extends React.PureComponent {
  state = {
    errors: [],
    loading: false
  }

  responseGoogle = async response => {
    await this.setState({loading: true});
    console.log(response)
    await this.props.socialLogin({
      variables: {
        accessToken: response.accessToken
      },
      refetchQueries: refetchQueries
    }).then(
      ({data: {loginWithGoogle}}) => {
        if (loginWithGoogle.token)
          // operation successfull
          console.log('successful')
        else {
          this.setState({errors: loginWithGoogle.errors})
          console.log('failed')
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
                <MDBAlert key={key} color={"danger"} className={"text-center z-depth-1 mb-4"}>{error}</MDBAlert>
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
                  clientId={google}
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
                  responseType={"code token id_token"}
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