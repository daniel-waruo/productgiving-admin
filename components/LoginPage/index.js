import React, {PureComponent} from "react";
import {NextSeo} from "next-seo"
import LoginForm from "./components/LoginForm";
import {withRouter} from "next/router";
import {MDBContainer} from "mdbreact";

class LoginPage extends PureComponent {

  render() {
    const {router: {query: {next}}} = this.props
    let redirectUrl = "/";
    if (next) redirectUrl = next;
    return (
      <MDBContainer>
        <NextSeo
          title={`Login`}
        />
        <LoginForm redirectUrl={redirectUrl}/>
      </MDBContainer>
    )
  }
}

export default withRouter(LoginPage)
