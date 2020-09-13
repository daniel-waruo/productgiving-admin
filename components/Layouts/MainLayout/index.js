import React from 'react';
import PropTypes from 'prop-types';
import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import {NextSeo} from "next-seo"
import SideNav, {NavSmall} from "./MainSideNav";
import Loader from "../../Loader";
import {graphql} from "react-apollo";
import {withRouter} from "next/router";
import {APP_QUERY} from "../../App/queries";
import {redirect} from "../../App/";


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
    if (!user && secure) return redirect("/login", true);
    return (
      <>
        <NextSeo title={title}/>
        <MDBAnimation type={"fadeIn"}>
          <NavSmall toggleFunction={this.toggleFunction}/>
          <div className={"overflow-hidden"}>
            <MDBRow className={"f-100-no-mobile"} center>
              <SideNav toggleFunction={this.toggleFunction}
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

MainLayout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
};

export default graphql(
  APP_QUERY
)(withRouter(MainLayout))