import React, {PureComponent} from "react";
import {loginWithGoogle} from "./queries";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import Loader from "../Loader"
import {NextSeo} from "next-seo"
import {MDBCol, MDBRow} from "mdbreact";
import LoginForm from "./components/LoginForm";

class Login extends PureComponent {

  render() {
    // get loginErrors and from the props
    const {loading} = this.props;
    // if still loading show spinner loader
    if (loading) return <Loader/>;
    // if user redirect to  redirect home or next
    //TODO : implement next
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
  graphql(loginWithGoogle, {name: 'loginWithGoogle'})
)(Login)
