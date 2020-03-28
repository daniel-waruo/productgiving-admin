import React from 'react';
import {MDBAlert, MDBCol, MDBRow} from 'mdbreact';
import SocialLogin from './socialLogin'

export default function LoginForm(props) {
  /*
  Props : onChange : Func , login : Func, loginErrors :  ,
  */

  const nonFieldErrors = props.loginErrors ?
    props.loginErrors.map(
      (error, key) => (
        <MDBAlert key={key} color={error.type} className={"text-center z-depth-1 mb-4"}>{error.text}</MDBAlert>
      )
    ) : null;

  return (
    <>
      {nonFieldErrors}
      <MDBRow className={"h-100"}>
        <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
          <div className={"p-3"}>
            <SocialLogin socialLogin={props.socialLogin}/>
          </div>
        </MDBCol>
      </MDBRow>
    </>
  );
}