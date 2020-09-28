import React from 'react';
import {
  MDBCardImage,
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
import Link from "next/link"
import {APP_QUERY} from "../../App/queries";

export function SideNavItem(props) {
  const {pathname, className, children, href, as} = props;
  return (
    <Link href={href} as={as}>
      <a>
        <MDBListGroupItem active={pathname === href} hover className={`z-depth-1 my-2 ${className}`}>
          {children}
        </MDBListGroupItem>
      </a>
    </Link>
  )
}

export const SidenavLogout = (props) => {
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
    <MDBListGroupItem hover className={`z-depth-1 my-2 ${className} light-green darken-4 text-white mt-5`}
                      onClick={onClick}>
      {children}
    </MDBListGroupItem>
  )
};

const SideNavChildren = props => {
  const {className, pathname, user} = props;
  if (user)
    // if user is authenticated return links which the user can access when logged in
    return (
      <>
        <SideNavItem pathname={pathname} className={className} href={"/"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/users"}>
          <MDBIcon icon={"users"} className={"mr-2"}/>
          Users
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/products"}>
          <MDBIcon icon={"shopping-bag"} className={"mr-2"}/>
          Products
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SidenavLogout className={className}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SidenavLogout>
      </>
    );
  return (
    <>
      <SideNavItem pathname={pathname} className={className} href={"/login"}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Login
      </SideNavItem>
      <SideNavItem pathname={pathname} className={className} href={"/account/password/reset"}>
        <MDBIcon fas icon={"lock-open"} className={"mr-2"}/>
        Reset Password
      </SideNavItem>
    </>
  )
}


export const NavSmall = ({toggleFunction}) => {

  return (
    <>
      <MDBNavbar light sticky={"top"} className={"d-md-block d-lg-none z-depth-1 bg-white"}>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavbarToggler onClick={toggleFunction}/>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </>
  )
};

export const NavLogo = props => {
  return (
    <>
      <div className={"justify-content-center d-flex mb-3"}>
        <MDBCardImage src={"/logo.png"}/>
      </div>
    </>
  )
}

const MemberSideNav = props => {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;
  const {pathname} = useRouter();
  return (
    <>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction}
               className={"bg-white text-black z-depth-1"}>
        <MDBListGroup className={"pl-2 pr-2"}>
          <NavLogo/>
          <SideNavChildren className={listClassSide} pathname={pathname} user={user}/>
        </MDBListGroup>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block  f-100 px-0"}>
        <div className={"pt-5 rounded f-50 h-100 z-depth-1 position-fixed col-lg-3"}>
          <MDBListGroup className={"pl-3 pr-0"}>
            <NavLogo/>
            <SideNavChildren className={listClass} pathname={pathname} user={user}/>
          </MDBListGroup>
        </div>
      </MDBCol>
    </>
  )
}

export default MemberSideNav