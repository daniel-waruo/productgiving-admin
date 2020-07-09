import React from 'react';
import {
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem
} from "mdbreact";
import {useRouter} from 'next/router'
import {SideNav} from "../../sidenav";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {APP_QUERY} from "../queries";
import Link from "next/link"

function SideNavItem(props) {
  const {pathname, className, children, href} = props;
  return (
    <Link href={href}>
      <a>
        <MDBListGroupItem active={pathname === href} hover className={`z-depth-1 my-2 ${className}`}>
          {children}
        </MDBListGroupItem>
      </a>
    </Link>
  )
}

const SidenavLogout = (props) => {
  const {className, children} = props;
  const [logout] = useMutation(gql`
      mutation Logout{
        logout @client
      }
    `);
  const onClick = () => {
    logout({
      refetchQueries: [
        {query: APP_QUERY}
      ]
    });
  };

  return (
    <MDBListGroupItem hover className={`z-depth-1 my-2 ${className} cyan darken-4 text-white mt-5`} onClick={onClick}>
      {children}
    </MDBListGroupItem>
  )
};

const SideNavChildren = props => {
  const {className, pathname, user} = props;
  if (user)
    // if user is authenticated return links which the user can access when logged in
    return (
      <MDBListGroup className={"px-1"}>
        <SideNavItem pathname={pathname} className={className} href={"/"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/courses"}>
          <MDBIcon icon={"graduation-cap"} className={"mr-2"}/>
          Courses
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/wallet"}>
          <MDBIcon icon={"wallet"} className={"mr-2"}/>
          Wallet
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SidenavLogout className={className}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SidenavLogout>
      </MDBListGroup>
    );
  return (
    <MDBListGroup className={"px-1"}>
      <SideNavItem pathname={pathname} className={className} href={"/"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
      <SideNavItem pathname={pathname} className={className} href={"/login"}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Login/Register
      </SideNavItem>
    </MDBListGroup>
  )
}
export const NavSmall = ({toggleFunction}) => {

  return (
    <>
      <MDBNavbar color="cyan darken-4" dark sticky={"top"} className={"mb-2 d-md-block d-lg-none z-depth-0"}>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavbarToggler onClick={toggleFunction}/>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </>
  )
};

function MainSideNav(props) {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;
  const {pathname} = useRouter();

  return (
    <>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black z-depth-1"}>
        <SideNavChildren className={listClassSide} pathname={pathname} user={user}/>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block  f-100 px-0"}>
        <div className={"pt-5 rounded f-50 h-100 z-depth-1 position-fixed col-lg-3"}>
          <SideNavChildren className={listClass} pathname={pathname} user={user}/>
        </div>
      </MDBCol>
    </>
  )
}

export default MainSideNav