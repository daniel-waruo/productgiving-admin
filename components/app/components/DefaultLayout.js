import React, {PureComponent} from 'react'
import {MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem} from "mdbreact";
import NavLink from "../../NavLink";
import Jumbotron from "../../Jumbotron";
import {withRouter} from "next/router";

class DefaultLayout extends PureComponent {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  closeCollapse = () => {
    if (this.state.isOpen)
      this.setState({isOpen: false});
  }

  render() {

    const {router: {asPath}} = this.props;
    console.log(asPath)
    return (
      <>
        <MDBNavbar dark fixed={"top"} color={"rgba-black-strong"} expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">M-Subscribe</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse}/>
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active={'/' === asPath}>
                <NavLink href={'/'}>Home</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"/#features" === asPath}>
                <NavLink href={"/#features"}>Features</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"/#features" === asPath}>
                <NavLink href={"/#features"}>Pricing</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"/#about-us" === asPath}>
                <NavLink href="/#about-us">About Us</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"/#our-team" === asPath}>
                <NavLink href="/#our-team">Our Team</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"/#contact-team" === asPath}>
                <NavLink href="/#contact-team">Contact Us</NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <div onClick={this.closeCollapse}>
          <Jumbotron>
            <div style={{height:"67px"}}/>
            {this.props.children}
          </Jumbotron>
        </div>
      </>
    )
  }
}

export default withRouter(DefaultLayout)
