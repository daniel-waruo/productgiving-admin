import React, {PureComponent} from "react";
import {NextSeo} from "next-seo"
import LoginForm from "./components/LoginForm";
import {withRouter} from "next/router";

class LoginPage extends PureComponent {

  render() {
    const {router: {pathname}} = this.props
    console.log(this.props)
    let redirectUrl;
    if (pathname.split("/").find(value => value === "member"))
      redirectUrl = "/member"
    if (pathname.split("/").find(value => value === "subscriber"))
      redirectUrl = "/subscriber"
    return (
      <>
        <NextSeo
          title={"Login"}
          description={
            "Login to your account"
          }
        />
        <LoginForm redirectUrl={redirectUrl}/>
      </>
    )
  }
}

export default withRouter(LoginPage)
