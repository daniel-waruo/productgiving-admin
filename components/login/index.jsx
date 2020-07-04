import React, {PureComponent} from "react";
import {APP_QUERY} from "../app/queries";
import Router from "next/router";
import {loginWithGoogle} from "./queries";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import Loader from "../loaders"
import {NextSeo} from "next-seo"
import {MDBAlert, MDBCol, MDBRow} from "mdbreact";
import SocialLogin from "./components/socialLogin";
import LoginForm from "./components/loginForm";

class Login extends PureComponent {
  state = {
    errors: []
  }

  render() {
    // get loginErrors and the user from the props
    const {data: {user}, loading} = this.props;
    // if still loading show spinner loader
    if (loading) return <Loader/>;

    // if user redirect to  redirect home or next
    //TODO : implement next
    if (user && typeof window !== "undefined") {
      // redirect to home if there is user
      Router.push('/')
    }

    // format form errors for display
    const nonFieldErrors = this.state.errors ?
      this.state.errors.map(
        (error, key) => (
          <MDBAlert key={key} color={error.type} className={"text-center z-depth-1 mb-4"}>{error.text}</MDBAlert>
        )
      ) : null;

    // return login form for rendering
    return (
      <>
        <NextSeo
          title={"Login"}
          description={
            "Login to our Class Pay Website to monetize your google classroom classes"
          }
        />
        <div className={"pt-5"}>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              {nonFieldErrors}
              <div className={"p-3"}>
                <LoginForm socialLogin={this.props.loginWithGoogle}/>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(APP_QUERY),
  graphql(loginWithGoogle, {name: 'loginWithGoogle'})
)(Login)
