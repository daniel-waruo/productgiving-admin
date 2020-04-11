import React from 'react';
import PropTypes from 'prop-types';
import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import {NextSeo} from "next-seo"
import Router from 'next/router'
import "./index.css"
import MainSideNav, {NavSmall} from "./sidenav";
import cookie from 'js-cookie'
import Loader from "../../loaders";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../queries";

export const redirectNoUser = () => {
  if (typeof window !== "undefined") {
    // remove the token
    cookie.remove("token");
    // redirect to login
    Router.push("/login");
  }
  return <h3 className={"text-center"}>User not Authenticated Redirecting to Login</h3>;
};

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    }
  }

  toggleFunction = () => {
    const {isOpen} = this.state;
    return this.setState({isOpen: !isOpen})
  };

  render() {
    const {title, secure, data: {user, loading, error}} = this.props;

    if (loading) return <Loader fullScreen={true}/>;

    if (error) return <h1 className={"text-center"}>{error.message}</h1>;

    if (!user && secure) return redirectNoUser();

    return (
      <>
        <NextSeo title={title}/>
        <MDBAnimation type={"fadeIn"}>
          <NavSmall toggleFunction={this.toggleFunction}/>
          <div className={"overflow-hidden"}>
            <MDBRow className={"f-100-no-mobile"}>
              <MainSideNav toggleFunction={this.toggleFunction}
                           isOpen={this.state.isOpen}
                           user={user}
                           className={"z-depth-1 px-0"}/>
              <MDBCol size={"12"} lg={"9"} className={"my-auto"}>
                {this.props.children}
              </MDBCol>
            </MDBRow>
          </div>
        </MDBAnimation>
      </>
    )
  }
}

MainLayout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
};

export default graphql(
  APP_QUERY
)(MainLayout);