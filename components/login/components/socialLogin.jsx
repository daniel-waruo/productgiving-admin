import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import {GoogleLogin} from 'react-google-login';
import {CLIENT_IDS, GOOGLE_LOGIN_URL} from "../../../_constants";
import {loginQueries} from '../../../components/login/queries';
import {APP_QUERY} from "../../app/queries";

const {google} = CLIENT_IDS;

const refetchQueries = [
  {query: loginQueries},
  {query: APP_QUERY},
];

class SocialLogin extends React.PureComponent {
  state = {
    loading: false
  };
  responseGoogle = async response => {
    await this.setState({loading: true});
    await this.props.socialLogin({
      variables: {
        url: GOOGLE_LOGIN_URL,
        accessToken: response.accessToken
      },
      refetchQueries: refetchQueries
    }).then(
      () => {
        this.setState({loading: false})
      }
    );
  };

  render() {
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
        <h1 className={"text-center text-grey"}>Log in with</h1>
        <div className={"d-flex justify-content-center mb-3"}>
          <GoogleLogin
            clientId={google}
            render={renderProps => (
              <MDBBtn onClick={renderProps.onClick} color={"transparent"} disabled={renderProps.disabled}
                      className={"rounded-pill w-75"}>
                <MDBIcon className={"mx-4 align-middle"} size={"2x"} fab icon="google"/> Google
                {loader}
              </MDBBtn>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </>
    )
  }
}


export default SocialLogin;