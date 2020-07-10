import React, {PureComponent} from "react";
import {NextSeo} from "next-seo"
import LoginForm from "./components/LoginForm";
import Jumbotron from "../Jumbotron";

class LoginPage extends PureComponent {

  render() {
    return (
      <Jumbotron>
        <NextSeo
          title={"Login"}
          description={
            "Login to our Class Pay Website to monetize your google classroom classes"
          }
        />
        <LoginForm/>
      </Jumbotron>
    )
  }
}

export default LoginPage
