import React from 'react';
import PropTypes from 'prop-types';
import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import {NextSeo} from "next-seo"
import MemberSideNav, {NavSmall} from "./MemberSideNav";
import Loader from "../../Loader";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../queries";
import {redirect} from "./index";
import {withRouter} from "next/router";


class MemberLayout extends React.Component {
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
    const {title, secure, data: {user, memberProfile, paymentProfile, loading, error}} = this.props;
    if (loading) return <Loader fullScreen={true}/>;
    if (error) return <h1 className={"text-center"}>{error.message}</h1>;
    if (!user && secure) return redirect("/member/login", true);
    const {router: {pathname}} = this.props;
    // check if the user has a member profile and if not
    // redirect the user to set it
    if (!memberProfile && (pathname !== '/member/account/member-profile') && user) {
      return redirect('/member/account/member-profile')
    }
    // check if payment profile and member profile is set if not
    // redirect to page where the account payment will be set
    if (!paymentProfile && (pathname !== '/member/account/payment') && user && memberProfile) {
      return redirect('/member/account/payment')
    }
    // make sure payment phone is verified
    if (paymentProfile && (pathname !== '/member/account/payment/verify-phone') && user && memberProfile) {
      if (!paymentProfile.phoneVerified)
        return redirect('/member/account/payment/verify-phone')
    }
    return (
      <>
        <NextSeo title={title}/>
        <MDBAnimation type={"fadeIn"}>
          <NavSmall toggleFunction={this.toggleFunction}/>
          <div className={"overflow-hidden"}>
            <MDBRow className={"f-100-no-mobile"} center>
              <MemberSideNav toggleFunction={this.toggleFunction}
                             isOpen={this.state.isOpen}
                             user={user}
                             className={"z-depth-1 px-0"}/>
              <MDBCol size={"12"} lg={"9"} className={"my-auto px-0"}>
                {this.props.children}
              </MDBCol>
            </MDBRow>
          </div>
        </MDBAnimation>
      </>
    )
  }
}

MemberLayout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
};

export default graphql(
  APP_QUERY
)(withRouter(MemberLayout))