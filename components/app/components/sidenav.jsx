import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdbreact";
import Router, {useRouter} from 'next/router'
import {SideNav} from "../../global/sidenav";
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
    <MDBListGroupItem hover className={`z-depth-1 my-2 ${className} bg-warning mt-5`} onClick={onClick}>
      {children}
    </MDBListGroupItem>
  )
};

const getSideNavChildren = (listClass, pathname, user, logout) => {

  if (user) {
    return (
      <MDBListGroup className={"px-1"}>
        <SideNavItem pathname={pathname} className={listClass} href={"/"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname} className={listClass} href={"/vote"}>
          <MDBIcon fas icon={"person-booth"} className={"mr-2"}/>
          Vote
        </SideNavItem>
        <SideNavItem pathname={pathname} className={listClass} href={"/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SidenavLogout className={listClass}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SidenavLogout>
      </MDBListGroup>
    )
  }
  return (
    <MDBListGroup>
      <SideNavItem pathname={pathname} className={listClass} href={"/"}>
        <MDBIcon icon={"home"} className={"mr-2"}/>
        Home
      </SideNavItem>
      <SideNavItem pathname={pathname} className={listClass} href={"/login"}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Login/Register
      </SideNavItem>
    </MDBListGroup>
  )
};


function MainSideNav(props) {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;
  const {pathname} = useRouter();
  const children = getSideNavChildren;
  return (
    <>
      <MDBBtn className={"position-fixed d-md-block d-lg-none rounded-pill hover-fade"}
              style={{
                zIndex: 1,
                display: isOpen ? "none!important" : "",
                left: "1rem"
              }}
              onClick={toggleFunction}>
        <MDBIcon icon={"bars"}/>
      </MDBBtn>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black z-depth-1"}>
        {children(listClassSide, pathname, user)}
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block my-auto z-depth-1 f-100"}>
        <div className={"mt-5 rounded f-50 h-100"}>
          {children(listClass, pathname, user)}
        </div>
      </MDBCol>
    </>
  )
}

export default MainSideNav